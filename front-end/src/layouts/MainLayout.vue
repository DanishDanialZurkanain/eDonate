<template>
  <span v-if="value">
    <q-layout view="lHh Lpr lFf">
    <q-header class="bg-grey-1 text-dark">
      <q-toolbar>
        <q-btn
          flat
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <div class="bg-transparent q-ma-md">
       <div class="row q-gutter-md">
         <div class="col-2">
          <q-item-section>
            <q-avatar rounded size="48px">
              <img src="~assets/gradient.jpg" />
            </q-avatar>
          </q-item-section>
         </div>
         <div class="col-8">
          <q-item-section>
            <q-item-label>{{ value.fullName }}</q-item-label>
            <q-item-label caption>{{ value.role }}</q-item-label>
          </q-item-section>
         </div>
       </div>
    
    </q-item>
      </div>
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
  </span>
</template>
<script>
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Home",
    caption: "Home Page",
    icon: "home",
    link: "/dashboard"
  },
  {
    title: "Profile",
    caption: "Personal Information",
    icon: "account_circle",
    link: "/profile"
  },
  {
    title: "Logout",
    caption: "Remove Your Session",
    icon: "exit_to_app",
    link: "/logout"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      essentialLinks: linksData,
      leftDrawerOpen: false,
      value: [],
    };
  },
   mounted() {
    this.getValue();
  },
  methods: {
    getValue() {
      this.value = this.$q.sessionStorage.getItem("user");
    },
  }
};
</script>
