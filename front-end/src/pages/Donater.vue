<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :data="receiver"
        row-key="fullName"
        selection="single"
        :selected.sync="selected"
      >
        <template v-slot:no-data="{ message }">
          <div class="full-width row flex-center q-gutter-sm">
            <span>
              🥳 Doesn't have any request at the moment
            </span>
          </div>
        </template>
      </q-table>
    </div>
    <div class="q-pa-md">
      <q-card class="my-card">
        <div v-for="select in selected" :key="select.id">
          <q-card-section>
            <div class="text-h6">
              Requester Information
            </div>
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-y-md">
              <q-input
                outlined
                disable
                :value="select.fullName"
                label="Fullname"
              />
              <q-input
                outlined
                disable
                :value="select.typeOfNeed"
                label="Type of Need"
              />
              <q-input
                outlined
                disable
                :value="select.typeOfHelp"
                label="Type of Help"
              />
              <q-btn
                outline
                class="full-width"
                color="primary"
                label="I Want to Donate"
                @click="donate(select.id, select.typeOfNeed)"
              />
            </div>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      receiver: [],
      selected: []
    };
  },
  mounted() {
    this.getValue();
    this.getReceiver();
  },
  methods: {
    donate(receiverId, typeOfNeed) {
      this.$axios.patch(`/receiver/${receiverId}`, {
        userId: this.value.id,
        status: "Not Active"
      });
      this.$axios
        .post("/donator", {
          userId: this.value.id,
          receiverId: receiverId,
          typeOfNeed: typeOfNeed
        })
        .then(() => {
          this.$q.notify({
            message: "Successfully Saved",
            color: "light-blue",
            position: "top"
          });
          this.$router.go(this.$router.currentRoute);
        });
    },
    getValue() {
      this.value = this.$q.sessionStorage.getItem("user");
    },
    getReceiver() {
      this.$axios.get("/receiver/active").then(res => {
        this.receiver = res.data;
      });
    },
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    }
  }
};
</script>
