const initViewToggle = () => {
  const btnCard = document.getElementById('btn-card-view');
  const btnList = document.getElementById('btn-list-view');
  const wrapperCard = document.getElementById('wrapper-card-view');
  const wrapperList = document.getElementById('wrapper-list-view');

  if (!(btnCard instanceof HTMLButtonElement) ||
    !(btnList instanceof HTMLButtonElement) ||
    !(wrapperCard instanceof HTMLElement) ||
    !(wrapperList instanceof HTMLElement)
  ) {
    return;
  }

  const setActiveView = (view: 'card' | 'list') => {
    const isCard = view === 'card';

    btnCard.classList.toggle('bg-brand-black', isCard);
    btnCard.classList.toggle('text-white', isCard);
    btnCard.classList.toggle('text-gray-500', !isCard);
    btnCard.classList.toggle('hover:text-brand-black', !isCard);
    btnCard.setAttribute('aria-pressed', String(isCard));

    btnList.classList.toggle('bg-brand-black', !isCard);
    btnList.classList.toggle('text-white', !isCard);
    btnList.classList.toggle('text-gray-500', isCard);
    btnList.classList.toggle('hover:text-brand-black', isCard);
    btnList.setAttribute('aria-pressed', String(!isCard));

    wrapperCard.hidden = !isCard;
    wrapperList.hidden = isCard;
  };

  btnCard.onclick = () => setActiveView('card');
  btnList.onclick = () => setActiveView('list');
};

initViewToggle();
document.addEventListener('astro:page-load', initViewToggle);
