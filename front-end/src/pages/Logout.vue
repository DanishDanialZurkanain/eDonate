<template> </template>

<script>
export default {
  data() {
    return {
      logout: []
    };
  },
  mounted() {
    this.logOut();
  },
  methods: {
    logOut() {
      this.logout = this.$q.sessionStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>
