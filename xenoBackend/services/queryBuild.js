import opMap from '../utils/operatorMap.js';


function buildFilter(group) {
  const conditions = [];

  if (Array.isArray(group.rules)) {
    group.rules.forEach(rule => {
      const mongoOp = opMap[rule.operator];
      if (!mongoOp) throw new Error(`Unsupported operator: ${rule.operator}`);
      conditions.push({ [rule.field]: { [mongoOp]: rule.value } });
    });
  }

  if (Array.isArray(group.groups)) {
    group.groups.forEach(subgroup => {
      conditions.push(buildFilter(subgroup));
    });
  }

  const key = group.combineWith === 'OR' ? '$or' : '$and';
  return conditions.length === 1 ? conditions[0] : { [key]: conditions };
}

export { buildFilter };
