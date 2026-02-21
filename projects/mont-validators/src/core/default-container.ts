import type { DecoratorConfiguration, InstanceContainer, PropertyInfo } from './validator.interface';
import type { Constructor } from './validator.interface';
import { PROPERTY, ARRAY_PROPERTY, OBJECT_PROPERTY } from '../const/property-types';
import { getConstructor } from '../util/type-guards';

const instances: InstanceContainer[] = [];

function getInstance(instanceFunc: Constructor): InstanceContainer | undefined {
  return instances.find((inst) => inst.instance === instanceFunc);
}

function addInstanceContainer(instanceFunc: Constructor): InstanceContainer {
  const instanceContainer: InstanceContainer = {
    instance: instanceFunc,
    propertyAnnotations: [],
    properties: [],
  };
  instances.push(instanceContainer);
  return instanceContainer;
}

function addProperty(instanceFunc: Constructor, propertyInfo: PropertyInfo): void {
  let instance = getInstance(instanceFunc);
  if (!instance) {
    instance = addInstanceContainer(instanceFunc);
  }
  const existing = instance.properties.find((p) => p.name === propertyInfo.name);
  if (!existing) {
    instance.properties.push(propertyInfo);
  } else {
    Object.assign(existing, propertyInfo);
  }
}

function addAnnotation(instanceFunc: Constructor, decoratorConfig: DecoratorConfiguration): void {
  addProperty(instanceFunc, {
    propertyType: PROPERTY,
    name: decoratorConfig.propertyName,
  });
  let instance = getInstance(instanceFunc);
  if (!instance) {
    instance = addInstanceContainer(instanceFunc);
  }
  instance.propertyAnnotations.push(decoratorConfig);

  const config =
    decoratorConfig.config && typeof decoratorConfig.config === 'object'
      ? (decoratorConfig.config as Record<string, unknown>)
      : undefined;
  const fieldName = config && typeof config['fieldName'] === 'string' ? config['fieldName'] : undefined;
  const rawFields = config?.['conditionalExpressionFields'];
  const conditionalFields =
    Array.isArray(rawFields)
      ? rawFields.filter((x): x is string => typeof x === 'string')
      : undefined;
  if (fieldName) {
    setConditionalValueProp(instance, fieldName, decoratorConfig.propertyName);
  }
  if (conditionalFields?.length) {
    addChangeValidation(
      instance,
      decoratorConfig.propertyName,
      conditionalFields.map((p) => ({ propName: p }))
    );
  }
}

function setConditionalValueProp(
  instance: InstanceContainer,
  propName: string,
  refPropName: string
): void {
  if (!instance.conditionalValidationProps) {
    instance.conditionalValidationProps = {};
  }
  if (!instance.conditionalValidationProps[propName]) {
    instance.conditionalValidationProps[propName] = [];
  }
  if (instance.conditionalValidationProps[propName].indexOf(refPropName) === -1) {
    instance.conditionalValidationProps[propName].push(refPropName);
  }
}

function addChangeValidation(
  instance: InstanceContainer,
  propertyName: string,
  columns: Array<{ propName: string }>
): void {
  for (const col of columns) {
    if (!instance.conditionalValidationProps) {
      instance.conditionalValidationProps = {};
    }
    if (!instance.conditionalValidationProps[col.propName]) {
      instance.conditionalValidationProps[col.propName] = [];
    }
    if (instance.conditionalValidationProps[col.propName].indexOf(propertyName) === -1) {
      instance.conditionalValidationProps[col.propName].push(propertyName);
    }
  }
}

function initPropertyObject(
  name: string,
  propertyType: typeof OBJECT_PROPERTY,
  entity: Constructor | undefined,
  target: object,
  config?: Record<string, unknown>
): void {
  const dataPropertyName =
    config?.['name'] !== undefined && typeof config['name'] === 'string'
      ? config['name']
      : undefined;
  const entityProvider =
    config?.['entityProvider'] !== undefined && typeof config['entityProvider'] === 'function'
      ? (config['entityProvider'] as () => Constructor)
      : undefined;
  const propertyInfo: PropertyInfo = {
    name,
    propertyType,
    entity,
    dataPropertyName,
    entityProvider,
    defaultValue: config?.['defaultValue'],
  };
  addProperty(getConstructor(target), propertyInfo);
}

export const defaultContainer = {
  get: getInstance,
  addAnnotation,
  addProperty,
  addInstanceContainer,
  addChangeValidation,
  init(
    target: object,
    _parameterIndex: number,
    propertyKey: string,
    annotationType: import('../const/annotation-types').AnnotationType,
    config: unknown,
    isAsync: boolean
  ): void {
    const decoratorConfig = {
      propertyIndex: 0,
      propertyName: propertyKey,
      annotationType,
      config,
      isAsync,
      isValidator: true,
    } as DecoratorConfiguration;
    addAnnotation(getConstructor(target), decoratorConfig);
  },
  initPropertyObject,
};
