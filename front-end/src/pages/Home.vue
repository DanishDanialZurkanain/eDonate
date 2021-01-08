<template>
  <div>
    <q-page>
      <div v-if="this.value.role == 'Donator'">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card">
            <q-card-section horizontal>
              <q-img
                class="col-5"
                src="https://images.unsplash.com/photo-1494386346843-e12284507169?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                style="height: 150px;"
              />
              <q-card-section>
                <div class="q-pb-sm text-body-1">
                  Donate some of you're Blood, Food or Household to the needies.
                </div>
                <q-separator />
                <div class="q-pt-sm">
                  <q-btn flat color="primary" class="full-width" to="/donater"
                    >Donate Here</q-btn
                  >
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-pa-md">
          <q-table title="Donate By Me" row-key="name" :data="donator">
            <template v-slot:no-data="{ message }">
              <div class="full-width row flex-center q-gutter-sm">
                <span>
                  😢 Made some donation.
                </span>
              </div>
            </template>
          </q-table>
        </div>
      </div>
      <div v-else-if="this.value.role == 'Receiver'">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card">
            <q-card-section horizontal>
              <q-img
                class="col-5"
                src="https://images.unsplash.com/photo-1494386346843-e12284507169?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                style="height: 150px;"
              />
              <q-card-section>
                <div class="q-pb-sm text-body-1">
                  Request some of a Blood, Food or Household from the Donator.
                </div>
                <q-separator />
                <div class="q-pt-sm">
                  <q-btn flat color="primary" class="full-width" to="/receiver"
                    >Request Here</q-btn
                  >
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-pa-md">
          <q-table title="Request by Me" row-key="id" :data="receiver" />
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      receiver: [],
      donator: []
    };
  },
  mounted() {
    this.getValue();
    this.getReceiver();
    this.getDonator();
  },
  methods: {
    donate(receiverId, typeOfNeed) {
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
        });
    },
    getValue() {
      this.value = this.$q.sessionStorage.getItem("user");
    },
    getDonator() {
      this.$axios.get(`/receiver/donator/${this.value.id}`).then(res => {
        this.donator = res.data;
      });
    },
    getReceiver() {
      this.$axios.get(`/receiver/request/${this.value.id}`).then(res => {
        this.receiver = res.data;
      });
    }
  }
};
</script>
