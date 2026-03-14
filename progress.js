// =============================================
// progress.js — Palawig-Wika Lesson Progress
// =============================================

const TOTAL_LESSONS = 46;
const STORAGE_KEY = 'palawigWikaProgress';

function getUnlockedCount() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const count = saved ? parseInt(saved, 10) : 1;
  return Math.min(Math.max(count, 1), TOTAL_LESSONS);
}

function unlockNextLesson(currentLesson) {
  const current = getUnlockedCount();
  if (currentLesson >= current) {
    const next = Math.min(currentLesson + 1, TOTAL_LESSONS);
    localStorage.setItem(STORAGE_KEY, next);
  }
}

function isLessonUnlocked(lessonNumber) {
  return lessonNumber <= getUnlockedCount();
}

// -----------------------------------------------
// Run on lessons.html — locks/unlocks lesson grid
// -----------------------------------------------
function applyLessonLocks() {
  const unlocked = getUnlockedCount();

  document.querySelectorAll('.lesson-btn[data-lesson]').forEach(btn => {
    const num = parseInt(btn.getAttribute('data-lesson'), 10);

    if (num <= unlocked) {
      btn.classList.remove('lesson-locked');
      btn.removeAttribute('aria-disabled');
      btn.style.pointerEvents = '';
    } else {
      btn.classList.add('lesson-locked');
      btn.setAttribute('aria-disabled', 'true');
      btn.style.pointerEvents = 'none';
      btn.removeAttribute('href');
    }
  });
}

// -----------------------------------------------
// Run on a lesson page — sets up the complete button
// -----------------------------------------------
function initLessonPage(lessonNumber) {
  // Redirect if student tries to access a locked lesson directly via URL
  if (!isLessonUnlocked(lessonNumber)) {
    window.location.href = 'lessons.html';
    return;
  }

  const btn = document.getElementById('complete-btn');
  if (!btn) return;

  const alreadyDone = lessonNumber < getUnlockedCount();

  if (alreadyDone) {
    btn.textContent = lessonNumber < TOTAL_LESSONS
      ? '✓ Tapos na — Pumunta sa Susunod na Aralin →'
      : '✓ Natapos mo na ang lahat ng aralin!';
    btn.classList.add('complete-btn-done');
  }

  btn.addEventListener('click', function () {
    unlockNextLesson(lessonNumber);

    if (lessonNumber < TOTAL_LESSONS) {
      window.location.href = 'lesson' + (lessonNumber + 1) + '.html';
    } else {
      btn.textContent = '✓ Natapos mo na ang lahat ng aralin!';
      btn.classList.add('complete-btn-done');
      btn.disabled = true;
    }
  });
}