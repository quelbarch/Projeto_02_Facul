(() => {
  "use strict";

  /* =========================
     MENU MOBILE + DROPDOWN
     ========================= */
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuLabel = menuToggle?.querySelector(".sr-only");
  const mainNav = document.querySelector("#menu-principal");
  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  const isMenuOpen = () => menuToggle?.getAttribute("aria-expanded") === "true";
  const isDropdownOpen = () => dropdownToggle?.getAttribute("aria-expanded") === "true";

  function setDropdown(open) {
    dropdownToggle?.setAttribute("aria-expanded", String(open));
    dropdown?.classList.toggle("is-open", open);
  }

  function setMenu(open) {
    menuToggle?.setAttribute("aria-expanded", String(open));
    mainNav?.classList.toggle("is-open", open);
    if (menuLabel) menuLabel.textContent = open ? "Fechar menu" : "Abrir menu";
    if (!open) setDropdown(false);
  }

  menuToggle?.addEventListener("click", () => setMenu(!isMenuOpen()));

  dropdownToggle?.addEventListener("click", () => setDropdown(!isDropdownOpen()));

  // Clicar em qualquer link do menu fecha menu e submenu.
  mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Clicar fora fecha o dropdown (e o menu mobile).
  document.addEventListener("click", (event) => {
    if (isDropdownOpen() && !dropdown?.contains(event.target)) setDropdown(false);
    if (isMenuOpen() && !header?.contains(event.target)) setMenu(false);
  });

  // Ao voltar para o layout desktop, limpa o estado do menu mobile.
  mobileQuery.addEventListener("change", (event) => {
    if (!event.matches) setMenu(false);
  });

  /* =========================
     FORMULÁRIO
     ========================= */
  const form = document.querySelector("#contact-form");
  const feedback = document.querySelector("#form-feedback");
  let feedbackTimer;

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    clearTimeout(feedbackTimer);
    // Limpa antes de escrever para o leitor de tela anunciar de novo.
    feedback.textContent = "";
    requestAnimationFrame(() => {
      feedback.textContent = "Mensagem enviada com sucesso! Este formulário é demonstrativo.";
    });
    form.reset();
    feedbackTimer = setTimeout(() => { feedback.textContent = ""; }, 6000);
  });

  /* =========================
     TOAST
     ========================= */
  const toast = document.querySelector("#toast");
  const showToastButton = document.querySelector("#show-toast");
  let toastTimer;
  let toastClearTimer;

  function showToast(title = "Sucesso!", message = "Ação concluída com segurança.") {
    if (!toast) return;
    clearTimeout(toastTimer);
    clearTimeout(toastClearTimer);

    // O texto é inserido só agora para o leitor de tela anunciar a mensagem.
    toast.innerHTML = "";
    const strong = document.createElement("strong");
    const span = document.createElement("span");
    strong.textContent = title;
    span.textContent = message;
    toast.append(strong, span);
    toast.classList.add("is-visible");

    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      toastClearTimer = setTimeout(() => { toast.innerHTML = ""; }, 300);
    }, 3500);
  }

  showToastButton?.addEventListener("click", () => showToast());

  /* =========================
     MODAL
     ========================= */
  const modal = document.querySelector("#modal");
  const openModalButton = document.querySelector("#open-modal");
  const closeModalButton = document.querySelector("#close-modal");
  const cancelModalButton = document.querySelector("#cancel-modal");
  const confirmModalButton = document.querySelector("#confirm-modal");
  const focusableSelector =
    'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  const isModalOpen = () => modal?.classList.contains("is-open");

  function openModal() {
    lastFocused = document.activeElement;
    modal?.classList.add("is-open");
    modal?.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    closeModalButton?.focus();
  }

  function closeModal() {
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    lastFocused?.focus();
    lastFocused = null;
  }

  openModalButton?.addEventListener("click", openModal);
  [closeModalButton, cancelModalButton].forEach((button) => button?.addEventListener("click", closeModal));
  confirmModalButton?.addEventListener("click", () => {
    closeModal();
    showToast("Confirmado!", "A ação foi executada com sucesso.");
  });
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  /* =========================
     TECLADO (Esc e Tab)
     ========================= */
  document.addEventListener("keydown", (event) => {
    if (isModalOpen()) {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      // Mantém o foco dentro do modal.
      if (event.key === "Tab") {
        const items = modal.querySelectorAll(focusableSelector);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      return;
    }

    if (event.key !== "Escape") return;

    if (isDropdownOpen()) {
      setDropdown(false);
      dropdownToggle?.focus();
    } else if (isMenuOpen()) {
      setMenu(false);
      menuToggle?.focus();
    }
  });
})();