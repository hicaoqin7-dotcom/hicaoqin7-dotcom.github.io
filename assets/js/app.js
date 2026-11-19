/* 交互脚本：仅负责视图/标签切换与锚点滚动，不修改页面内容结构。
   原版本中通过 JS 追加/删除的内容已在构建期固化为静态 HTML。 */
(function () {
  'use strict';

  /* ---------- 通用标签页 ---------- */
  function bindTabs(tabSelector, panelSelector, tabKey, panelKey) {
    const tabs = Array.from(document.querySelectorAll(tabSelector));
    const panels = Array.from(document.querySelectorAll(panelSelector));
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const key = tab.dataset[tabKey];
        tabs.forEach(function (item) {
          const on = item === tab;
          item.classList.toggle('active', on);
          item.setAttribute('aria-selected', String(on));
        });
        panels.forEach(function (panel) {
          panel.classList.toggle('active', panel.dataset[panelKey] === key);
        });
      });
    });
  }

  /* ---------- 页面切换 ---------- */
  const pages = Array.from(document.querySelectorAll('.page'));

  function showPage(id) {
    pages.forEach(function (page) {
      page.classList.toggle('active', page.id === id);
    });
    document.querySelectorAll('.nav button[data-page]').forEach(function (button) {
      button.classList.toggle('active', button.dataset.page === id);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('[data-page]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      showPage(trigger.dataset.page);
    });
  });

  /* ---------- 案例内锚点 ---------- */
  document.querySelectorAll('[data-scroll]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const target = document.getElementById(trigger.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- 绑定所有标签组 ---------- */
  bindTabs('[data-ai-service-tab]', '[data-ai-service-panel]', 'aiServiceTab', 'aiServicePanel');
  bindTabs('[data-business-tab]', '[data-business-panel]', 'businessTab', 'businessPanel');
  bindTabs('[data-exp-tab]', '[data-exp-panel]', 'expTab', 'expPanel');

  /* ---------- 轻提示 ---------- */
  const toast = document.getElementById('toast');
  let toastTimer;

  function notify(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3000);
  }

  document.querySelectorAll('[data-toast]').forEach(function (trigger) {
    trigger.addEventListener('click', function () { notify(trigger.dataset.toast); });
  });

  /* ---------- 联系我 ---------- */
  const contact = document.querySelector('[data-contact]');
  if (contact) {
    contact.addEventListener('click', function () {
      const section = document.getElementById('contact');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
})();
