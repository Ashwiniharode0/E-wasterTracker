// const UserManagement = artifacts.require("UserManagement");
// const EWasteTracking = artifacts.require("EWasteTracking");

// module.exports = async function (deployer) {
//     await deployer.deploy(UserManagement);
//     await deployer.deploy(EWasteTracking);
// };



// SPDX-License-Identifier: MIT
const UserManagement = artifacts.require("UserManagement");
const eWasteTracking = artifacts.require("eWasteTracking");
const LogisticsTracking = artifacts.require("LogisticsTracking");
const RecyclingManagement = artifacts.require("RecyclingManagement");
const ComplianceAudit = artifacts.require("ComplianceAudit");

module.exports = async function (deployer) {
  // Deploy UserManagement FIRST (it has no dependencies)
  await deployer.deploy(UserManagement);
  const userManagement = await UserManagement.deployed();
  console.log("UserManagement deployed at:", userManagement.address);

  // Deploy eWasteTracking with UserManagement address
  await deployer.deploy(eWasteTracking, userManagement.address);
  const eWasteInstance = await eWasteTracking.deployed();
  console.log("eWasteTracking deployed at:", eWasteInstance.address);

  // Deploy LogisticsTracking with UserManagement address
  await deployer.deploy(LogisticsTracking, userManagement.address);
  const logisticsInstance = await LogisticsTracking.deployed();
  console.log("LogisticsTracking deployed at:", logisticsInstance.address);

  // Deploy RecyclingManagement with UserManagement and eWasteTracking addresses
  await deployer.deploy(
    RecyclingManagement,
    userManagement.address,
    eWasteInstance.address
  );
  const recyclingInstance = await RecyclingManagement.deployed();
  console.log("RecyclingManagement deployed at:", recyclingInstance.address);

  // Deploy ComplianceAudit with all required addresses
  await deployer.deploy(
    ComplianceAudit,
    userManagement.address,
    recyclingInstance.address,
    eWasteInstance.address
  );
  const auditInstance = await ComplianceAudit.deployed();
  console.log("ComplianceAudit deployed at:", auditInstance.address);
};