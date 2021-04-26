const isProductionEnvironment = () => process.env.environment === 'production';
const isPrEnvironment = () => process.env.environment === 'prenv';
const isLocal = () => process.env.environment === 'local';

const assumeLocal = () => isLocal() || !(isProductionEnvironment() && isPrEnvironment());

export {
  isProductionEnvironment,
  isPrEnvironment,
  isLocal,
  assumeLocal
}