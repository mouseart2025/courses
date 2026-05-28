const getTextInput = (id: string) => {
  const element = document.getElementById(id);
  return element instanceof HTMLInputElement ? element : null;
};

const getSelect = (id: string) => {
  const element = document.getElementById(id);
  return element instanceof HTMLSelectElement ? element : null;
};

const getTextarea = (id: string) => {
  const element = document.getElementById(id);
  return element instanceof HTMLTextAreaElement ? element : null;
};

const initCopyWechat = () => {
  const copyBtn = document.getElementById('btn-copy-wechat');
  if (!(copyBtn instanceof HTMLButtonElement)) return;

  copyBtn.onclick = () => {
    const showCopiedState = () => {
      const originalText = copyBtn.innerText;
      copyBtn.innerText = '已复制！';
      copyBtn.classList.remove('bg-brand-black');
      copyBtn.classList.add('bg-brand-red');
      window.setTimeout(() => {
        copyBtn.innerText = originalText;
        copyBtn.classList.remove('bg-brand-red');
        copyBtn.classList.add('bg-brand-black');
      }, 1500);
    };

    if (!navigator.clipboard) {
      alert('微信号 Seeed_Chaihuo 已复制，请在微信中搜索添加。');
      return;
    }

    navigator.clipboard
      .writeText('Seeed_Chaihuo')
      .then(showCopiedState)
      .catch(() => {
        alert('微信号 Seeed_Chaihuo 已复制，请在微信中搜索添加。');
      });
  };
};

const initFormPreselection = () => {
  const formSelect = getSelect('partnership-form-select');
  if (!formSelect) return;

  const urlParams = new URLSearchParams(window.location.search);
  let formCode = urlParams.get('form');

  if (!formCode && window.location.hash) {
    const hashMatch = window.location.hash.match(/form-([A-D])/);
    if (hashMatch) {
      formCode = hashMatch[1];
    }
  }

  if (formCode && ['A', 'B', 'C', 'D'].includes(formCode)) {
    formSelect.value = formCode;
    formSelect.classList.add('border-brand-red', 'ring-2', 'ring-brand-red/50');
    window.setTimeout(() => {
      formSelect.classList.remove('border-brand-red', 'ring-2', 'ring-brand-red/50');
    }, 1500);
  }

  document.querySelectorAll('.btn-preselect').forEach((btn) => {
    if (!(btn instanceof HTMLAnchorElement)) return;

    btn.onclick = () => {
      const code = btn.getAttribute('data-form-select');
      if (code) {
        formSelect.value = code;
        formSelect.classList.add('border-brand-red', 'scale-[1.02]');
        window.setTimeout(() => {
          formSelect.classList.remove('border-brand-red', 'scale-[1.02]');
        }, 1200);
      }
    };
  });
};

const updateMailtoTemplate = () => {
  const nameInput = getTextInput('form-name');
  const orgInput = getTextInput('form-org');
  const roleElement = getSelect('form-role');
  const selectElement = getSelect('partnership-form-select');
  const contactInput = getTextInput('form-contact');
  const messageInput = getTextarea('form-message');
  const mailtoPrefilledBtn = document.getElementById('mailto-prefilled-btn');

  if (!nameInput ||
    !orgInput ||
    !roleElement ||
    !selectElement ||
    !contactInput ||
    !messageInput ||
    !(mailtoPrefilledBtn instanceof HTMLAnchorElement)
  ) {
    return;
  }

  const name = nameInput.value;
  const org = orgInput.value;
  const role = roleElement.options[roleElement.selectedIndex]?.text || '[未选择]';
  const selectedFormText = selectElement.options[selectElement.selectedIndex]?.text || '[未选择]';
  const contact = contactInput.value;
  const message = messageInput.value;

  const subject = encodeURIComponent(`柴火课程合作咨询 · ${org} - ${name}`);
  const body = encodeURIComponent(
    `您好！我是 ${name}，我们希望咨询柴火创客学院的课程合作。\n\n` +
    `意向详情如下：\n` +
    `- 联系人姓名：${name}\n` +
    `- 咨询单位/机构：${org}\n` +
    `- 您的角色：${role}\n` +
    `- 意向合作形态：${selectedFormText}\n` +
    `- 您的联系电话/微信：${contact}\n` +
    `- 具体需求或描述：\n${message || '无'}\n\n` +
    `期待与您的沟通！`,
  );

  const mailtoUri = `mailto:jiayu.wang@seeed.cc?subject=${subject}&body=${body}`;
  mailtoPrefilledBtn.setAttribute('href', mailtoUri);

  const directMailLink = document.getElementById('direct-mail-link');
  if (directMailLink instanceof HTMLAnchorElement) {
    directMailLink.setAttribute('href', mailtoUri);
  }
};

const initContactForm = () => {
  const form = document.getElementById('cooperation-web-form');
  const successBox = document.getElementById('form-success-box');

  if (!(form instanceof HTMLFormElement) || !(successBox instanceof HTMLElement)) {
    return;
  }

  form.onsubmit = (event) => {
    event.preventDefault();

    updateMailtoTemplate();

    successBox.classList.remove('hidden');
    successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    successBox.focus({ preventScroll: true });

    form.reset();
  };

  form.querySelectorAll('input, select, textarea').forEach((element) => {
    if (element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      element.onblur = updateMailtoTemplate;
    }
  });
};

const initContactPage = () => {
  initCopyWechat();
  initFormPreselection();
  initContactForm();
};

initContactPage();
document.addEventListener('astro:page-load', initContactPage);
