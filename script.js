/**
 * Fdel Röte Jazz Orchester — script.js
 * スムーズスクロール / ヘッダースクロール制御 / ハンバーガーメニュー / フォームバリデーション
 */

(function () {
  'use strict';

  /* ============================================================
     1. スムーズスクロール
        href="#xxx" を持つすべてのリンクに適用
        固定ヘッダーの高さ分オフセット
     ============================================================ */
  function getHeaderHeight() {
    const header = document.querySelector('.site-header');
    return header ? header.offsetHeight : 0;
  }

  function scrollToTarget(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const offset = getHeaderHeight();
    const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    e.preventDefault();
    scrollToTarget(href);

    // モバイルメニューが開いていれば閉じる
    closeNav();
  });


  /* ============================================================
     2. ヘッダー — スクロール時に背景を追加
     ============================================================ */
  const header = document.querySelector('.site-header');

  function updateHeader() {
    if (!header) return;
    const scrolled = window.scrollY > 20;
    header.classList.toggle('scrolled', scrolled);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // 初期状態を反映


  /* ============================================================
     3. ハンバーガーメニュー（モバイル）
     ============================================================ */
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav   = document.querySelector('.site-nav');

  function openNav() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'メニューを閉じる');
    siteNav.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // スクロール防止
  }

  function closeNav() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'メニューを開く');
    siteNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });
  }

  // ウィンドウリサイズ時にメニューを閉じる
  window.addEventListener('resize', function () {
    if (window.innerWidth > 600) {
      closeNav();
    }
  });

  // Esc キーでメニューを閉じる
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeNav();
    }
  });


  /* ============================================================
     4. Contact フォーム — フロントエンドバリデーション
        実際の送信処理は行わず、UIのみで完結させる
     ============================================================ */
  const form        = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const valid = validateForm();
      if (valid) {
        showSuccess();
      }
    });

    // リアルタイムバリデーション（フォーカスアウト時）
    form.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });
      field.addEventListener('input', function () {
        // エラー表示中のみリアルタイムで更新
        if (field.classList.contains('is-invalid')) {
          validateField(field);
        }
      });
    });
  }

  function validateForm() {
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let allValid = true;

    fields.forEach(function (field) {
      if (!validateField(field)) {
        allValid = false;
      }
    });

    return allValid;
  }

  function validateField(field) {
    const errorEl = field.parentElement.querySelector('.form-error');
    let message = '';

    if (field.validity.valueMissing) {
      message = 'この項目は必須です。';
    } else if (field.type === 'email' && field.validity.typeMismatch) {
      message = '有効なメールアドレスを入力してください。';
    } else if (field.value.trim().length < 2 && field.type !== 'email') {
      message = '2文字以上で入力してください。';
    }

    if (message) {
      field.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = message;
      return false;
    } else {
      field.classList.remove('is-invalid');
      field.removeAttribute('aria-invalid');
      if (errorEl) errorEl.textContent = '';
      return true;
    }
  }

  function showSuccess() {
    if (!formSuccess) return;

    // フォームフィールドを非表示にして成功メッセージを表示
    form.querySelectorAll('.form-group').forEach(function (group) {
      group.style.opacity = '0.35';
      group.style.pointerEvents = 'none';
    });

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.35';
    }

    formSuccess.hidden = false;
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }


  /* ============================================================
     5. フライヤー画像 — 読み込み成功時に overlay を非表示
     ============================================================ */
  const flyerImg = document.querySelector('.flyer-img');
  const flyerOverlay = document.querySelector('.flyer-overlay');

  if (flyerImg && flyerOverlay) {
    if (flyerImg.complete && flyerImg.naturalWidth > 0) {
      // すでにキャッシュから読み込まれている場合
      flyerOverlay.style.display = 'none';
    } else {
      flyerImg.addEventListener('load', function () {
        flyerOverlay.style.display = 'none';
      });
    }
  }


  /* ============================================================
     6. アクティブナビゲーション — IntersectionObserver
        スクロール位置に応じてナビリンクをハイライト
     ============================================================ */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.site-nav a[href^="#"]');

  if ('IntersectionObserver' in window && navLinks.length > 0) {
    const observerOptions = {
      root:       null,
      rootMargin: '-30% 0px -65% 0px',
      threshold:  0,
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;
        navLinks.forEach(function (link) {
          const isActive = link.getAttribute('href') === '#' + id;
          link.classList.toggle('is-active', isActive);
          link.setAttribute('aria-current', isActive ? 'page' : 'false');
        });
      });
    }, observerOptions);

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

})();
