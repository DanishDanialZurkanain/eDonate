<template>
  <div>
    <q-page>
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" style="width:100%">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">You're Information</div>
            <q-space />
            <q-btn
              outline
              label="Update "
              color="primary"
              @click="updateProfile = true"
            />
          </q-card-section>
          <q-card-section class="q-gutter-md">
            <q-input
              outlined
              label="Fullname"
              :value="value.fullName"
              disable
            />
            <q-input
              outlined
              label="Username"
              :value="value.userName"
              disable
            />
            <q-input outlined label="Role" :value="value.role" disable />
            <q-input
              outlined
              label="Registered"
              :value="value.createdAt"
              disable
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- NOTE Sign Up Modal -->
      <q-dialog v-model="updateProfile" persistent>
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Update You're Information</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-input outlined label="Username" v-model="form.userName" />
            <q-input outlined label="Fullname" v-model="form.fullName" />
            <div class="row q-gutter-md q-ml-none q-mt-none">
              <div class="col">
                <q-input
                  outlined
                  type="password"
                  label="Password"
                  v-model="form.password"
                />
              </div>
              <div class="col">
                <q-input
                  outlined
                  type="password"
                  label="Confirm"
                  v-model="form.rePassword"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn
              flat
              label="Update"
              color="primary"
              class="full-width"
              v-close-popup
              @click="updateInformation"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userName: "",
        fullName: "",
        password: "",
        rePassword: ""
      },
      value: [],
      updateProfile: false
    };
  },
  mounted() {
    this.getValue();
  },
  methods: {
    updateInformation() {
      if (this.form.password == this.form.rePassword) {
        this.$axios
          .patch(`user/${this.value.id}`, {
            userName: this.form.userName,
            fullName: this.form.fullName
          })
          .then(() => {
            this.form = {
              userName: "",
              fullName: "",
              password: "",
              rePassword: ""
            };
            this.$q.notify({
              message: "Successfully Update",
              color: "light-blue",
              position: "top"
            });
          });
      } else {
        this.form = {
          userName: "",
          fullName: "",
          password: "",
          rePassword: ""
        };
        this.$q.notify({
          message: "Password and Confirm Password Not Match",
          color: "red",
          position: "top"
        });
      }
    },
    getValue() {
      this.value = this.$q.sessionStorage.getItem("user");
    }
  }
};
</script>
