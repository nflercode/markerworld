function getChangedObjectField(updateEvent) {
  const newKeys = Object.keys(updateEvent.newValue);
  const changedFields = newKeys.map((key) => {
    if (updateEvent.oldValue[key] != updateEvent.newValue[key])
      return { [key]: updateEvent.newValue[key] }
  }).filter(Boolean);

  return changedFields;
}

export { getChangedObjectField }