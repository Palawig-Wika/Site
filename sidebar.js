// sidebar.js — shared sidebar for all pages

document.addEventListener('DOMContentLoaded', function () {
  const sidebarHTML = `
        <div class="sidebar" id="sidebar">
            <div class="sidebar-brand">
                <img src="header main logo.png" alt="Palawig-Wika Logo" class="sidebar-logo">
            </div>
            <a href="gabay.html">Gabay</a>
            <a href="layunin.html">Layunin</a>
            <a href="sanggunian.html">Sanggunian</a>
        </div>
        <div class="sidebar-overlay" id="sidebar-overlay" onclick="toggleSidebar()"></div>
    `;

  const header = document.querySelector('header');
  if (header) {
    header.insertAdjacentHTML('beforebegin', sidebarHTML);
  }
});

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("sidebar-overlay").classList.toggle("active");
}