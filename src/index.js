const { Selector } = require('testcafe');
const { ReactSelector } = require('testcafe-react-selectors');

fixture`Getting Started`.page`http://localhost:19006/user/login`;

test('login test', async t => {
  await login(t, 'xiaoming', '123456');
});

async function login(t, username, password) {
  const inputUsername = Selector('input').nth(0);
  const inputPassword = Selector('input').nth(1);
  const button = Selector('div').withExactText('登 录');

  // image validation modal
  const imageModal = Selector('div').withExactText('安全验证').parent().parent();
  const validationImage = imageModal.find('img').nth(0);
  const dragHandle = imageModal.find('svg').nth(2);

  // SMS validation modal
  const smsModal = ReactSelector('InputSMSVerification').parent();
  const smsModalInput = ReactSelector('InputSMSVerification TextInput');
  const smsModalBtn = smsModal.find('div').withExactText('确定');

  // 输入用户名和密码并提交
  await t.typeText(inputUsername, username);
  await t.typeText(inputPassword, password);
  await t.click(button);

  // 图形验证
  await t.expect(imageModal.exists).ok();
  await t.expect(validationImage.exists).ok();
  await t.drag(dragHandle, 60, 0);

  // 短信验证
  await t.expect(smsModal.exists).ok();
  await t.expect(smsModalInput.exists).ok();
  await t.typeText(smsModalInput, '123456');
  // await t.wait(200);
  await t.click(smsModalBtn);
}
