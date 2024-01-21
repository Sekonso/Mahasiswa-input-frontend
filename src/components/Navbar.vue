<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid container">
      <a class="navbar-brand" href="#">DATA INPUT MAHASISWA</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link
            to="/"
            class="nav-link"
            :class="{ active: $route.path === '/' }"
            >Home</router-link
          >
          <router-link
            to="/mahasiswa"
            class="nav-link"
            :class="{ active: $route.path === '/mahasiswa' }"
            >Mahasiswa</router-link
          >
          <router-link
            to="/nilai"
            class="nav-link"
            :class="{ active: $route.path === '/nilai' }"
            >Nilai</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>
