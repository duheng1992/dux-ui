export default function hoistStatics(targetComponent: any, sourceComponent: any) {
  if ('defaultProps' in sourceComponent) {
    targetComponent.defaultProps = sourceComponent.defaultProps;
  }
  return targetComponent;
}
