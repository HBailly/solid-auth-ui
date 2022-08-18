<template>
  <b-navbar class="bg-primary" data-cy="navbar" toggleable="md" type="dark">
    <b-navbar-brand b-link class="logo" to="/">
      <span class="logo-img"></span>
      <span class="navbar-title">SOLID</span>
    </b-navbar-brand>
    <b-navbar-toggle
      aria-expanded="false"
      aria-label="Toggle navigation"
      class="jh-navbar-toggler d-lg-none"
      data-toggle="collapse"
      href="javascript:void(0);"
      right
      target="header-tabs"
    >
      <font-awesome-icon icon="bars" />
    </b-navbar-toggle>

    <b-collapse id="header-tabs" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item exact to="/">
          <span>
            <font-awesome-icon icon="home" />
            <span>Home</span>
          </span>
        </b-nav-item>
        <b-nav-item-dropdown active-class="active" class="pointer" right>
          <span slot="button-content" class="navbar-dropdown-menu">
            <span class="no-bold">Research</span>
          </span>
          <b-dropdown-item exact to="/prototype/trial">
            <span>
              <font-awesome-icon icon="triangle-exclamation" />
              <span>Trial</span>
            </span>
          </b-dropdown-item>
          <b-dropdown-item exact to="/prototype">
            <span>
              <font-awesome-icon icon="microscope" />
              <span>Survey</span>
            </span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown active-class="active" class="pointer" right>
          <span slot="button-content" class="navbar-dropdown-menu">
            <span class="no-bold">Help</span>
            <font-awesome-icon icon="question" />
          </span>
          <b-dropdown-item exact to="/prototype/tutorial">
            <span>
              <font-awesome-icon icon="chalkboard-user" />
              <span>Tutorial</span>
            </span>
          </b-dropdown-item>
          <b-dropdown-item exact to="/prototype/glossary">
            <span>
              <font-awesome-icon icon="spell-check" />
              <span>Glossary</span>
            </span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown active-class="active" class="pointer" right>
          <span slot="button-content" class="navbar-dropdown-menu">
            <span class="no-bold">About</span>
          </span>
          <b-dropdown-item exact to="/about">
            <span>
              <font-awesome-icon icon="circle-info" />
              <span>Context</span>
            </span>
          </b-dropdown-item>
          <b-dropdown-item exact to="/about/literature">
            <span>
              <font-awesome-icon icon="graduation-cap" />
              <span>Literature</span>
            </span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item exact to="/contact">
          <span>
            <font-awesome-icon icon="paper-plane" />
            <span>Contact</span>
          </span>
        </b-nav-item>
        <b-nav-item-dropdown
          v-if="hasAnyAuthority('ROLE_ADMIN') && authenticated"
          id="admin-menu"
          :class="{ 'router-link-active': subIsActive('/admin') }"
          active-class="active"
          class="pointer"
          data-cy="adminMenu"
          right
        >
          <span slot="button-content" class="navbar-dropdown-menu">
            <font-awesome-icon icon="users-cog" />
            <span class="no-bold">Administration</span>
          </span>
          <b-dropdown-item active-class="active" to="/admin/user-management">
            <font-awesome-icon icon="users" />
            <span>User management</span>
          </b-dropdown-item>
          <b-dropdown-item active-class="active" to="/admin/metrics">
            <font-awesome-icon icon="tachometer-alt" />
            <span>Metrics</span>
          </b-dropdown-item>
          <b-dropdown-item active-class="active" to="/admin/health">
            <font-awesome-icon icon="heart" />
            <span>Health</span>
          </b-dropdown-item>
          <b-dropdown-item active-class="active" to="/admin/configuration">
            <font-awesome-icon icon="cogs" />
            <span>Configuration</span>
          </b-dropdown-item>
          <b-dropdown-item active-class="active" to="/admin/logs">
            <font-awesome-icon icon="tasks" />
            <span>Logs</span>
          </b-dropdown-item>
          <b-dropdown-item v-if="openAPIEnabled" active-class="active" to="/admin/docs">
            <font-awesome-icon icon="book" />
            <span>API</span>
          </b-dropdown-item>
          <b-dropdown-item v-if="!inProduction" href="./h2-console/" target="_tab">
            <font-awesome-icon icon="database" />
            <span>Database</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown
          id="account-menu"
          :class="{ 'router-link-active': subIsActive('/account') }"
          active-class="active"
          class="pointer"
          data-cy="accountMenu"
          href="javascript:void(0);"
          right
        >
          <span slot="button-content" class="navbar-dropdown-menu">
            <font-awesome-icon icon="user" />
            <span class="no-bold"> Account </span>
          </span>
          <b-dropdown-item v-if="authenticated" active-class="active" data-cy="settings" tag="b-dropdown-item" to="/account/settings">
            <font-awesome-icon icon="wrench" />
            <span>Settings</span>
          </b-dropdown-item>
          <b-dropdown-item v-if="authenticated" active-class="active" data-cy="passwordItem" tag="b-dropdown-item" to="/account/password">
            <font-awesome-icon icon="lock" />
            <span>Password</span>
          </b-dropdown-item>
          <b-dropdown-item v-if="authenticated" id="logout" active-class="active" data-cy="logout" v-on:click="logout()">
            <font-awesome-icon icon="sign-out-alt" />
            <span>Sign out</span>
          </b-dropdown-item>
          <b-dropdown-item v-if="!authenticated" id="login" active-class="active" data-cy="login" v-on:click="openLogin()">
            <font-awesome-icon icon="sign-in-alt" />
            <span>Sign in</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts" src="./jhi-navbar.component.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* ==========================================================================
    Navbar
    ========================================================================== */
.navbar-version {
  font-size: 10px;
}

@media screen and (min-width: 768px) {
  .jh-navbar-toggler {
    display: none;
  }
}

/*@media screen and (min-width: 768px) and (max-width: 1150px) {*/
/*  span span {*/
/*    display: none;*/
/*  }*/
/*}*/

.navbar-title {
  display: inline-block;
  vertical-align: middle;
}

/* ==========================================================================
    Logo styles
    ========================================================================== */
.navbar-brand.logo {
  padding: 1px 1px;
}

.logo .logo-img {
  height: 65px;
  display: inline-block;
  vertical-align: middle;
  width: 100px;
}

.logo-img {
  height: 100%;
  background: url('https://www.svgrepo.com/show/229585/police-cap.svg') no-repeat center center;
  background-size: contain;
  width: 100%;
  filter: drop-shadow(0 0 0.05rem white);
}
</style>
