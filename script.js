const appointmentForm = document.querySelector('.contact-form');
const successModal = document.getElementById('successModal');
const successCard = document.querySelector('.success-card');
const successClose = document.querySelector('.success-close');

const closeSuccessModal = function () {
  if (!successModal || !successCard || !successClose) return;

  successClose.classList.remove('is-closing');
  void successClose.offsetWidth;
  successClose.classList.add('is-closing');

  successModal.classList.remove('visible');
  successModal.classList.add('closing');
  successCard.classList.add('closing');

  const finishClose = function () {
    successModal.style.display = 'none';
    successModal.classList.remove('closing');
    successCard.classList.remove('closing');
    successClose.classList.remove('is-closing');
    successModal.removeEventListener('animationend', finishClose);
  };

  successModal.addEventListener('animationend', finishClose, { once: true });
  setTimeout(function () {
    if (successModal.classList.contains('closing')) {
      finishClose();
    }
  }, 320);
};

if (appointmentForm) {
  appointmentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (successModal) {
      successModal.classList.remove('closing');
      successCard.classList.remove('closing');
      successModal.style.display = 'flex';
      successModal.classList.remove('visible');
      void successModal.offsetWidth;
      successModal.classList.add('visible');
    }

    appointmentForm.reset();
  });
}

if (successClose) {
  successClose.addEventListener('click', closeSuccessModal);
}

if (successModal) {
  successModal.addEventListener('click', function (event) {
    if (event.target === successModal) {
      closeSuccessModal();
    }
  });
}