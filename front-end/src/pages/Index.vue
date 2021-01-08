<template>
  <div class="q-pa-md q-my-xl">
    <div class="text-center">
      <img
        src="~assets/logo.png"
        alt="Caring by Nithinan Tatah from the Noun Project"
        width="132px"
        height="auto"
      />
      <h4>e-Donate</h4>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-input outlined label="Username" v-model="form.userName" />
      <q-input
        outlined
        type="password"
        label="Password"
        v-model="form.password"
      />
    </div>
    <div class="q-pa-md row q-col-gutter-md">
      <div class="col">
        <q-btn
          outline
          color="primary"
          class="full-width"
          label="Login"
          @click="authenticate"
        />
      </div>
      <div class="col">
        <q-btn
          outline
          color="red"
          class="full-width"
          label="Forgot Password"
          @click="forgotPassword = true"
        />
      </div>
    </div>
    <div class="q-pa-md">
      <q-btn
        flat
        color="grey"
        class="full-width"
        label="Sign Up"
        @click="signUp = true"
      />
    </div>

    <!-- NOTE Forgot Password Modal -->
    <q-dialog v-model="forgotPassword" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Reset Password</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <span class="text-justify"
            >Enter your username and password below and we'll reset your
            password.
          </span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input outlined label="Username" v-model="form.username" />
          <div class="row q-gutter-md q-pl-none q-mt-none">
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

        <q-card-actions align="center">
          <q-btn
            flat
            label="Reset Password"
            color="primary"
            class="full-width"
            v-close-popup
            @click="resetPassword"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- NOTE Sign Up Modal -->
    <q-dialog v-model="signUp" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Sign Up</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input outlined label="Username" v-model="form.userName" />
          <q-input outlined label="Fullname" v-model="form.fullName" />
          <q-select
            outlined
            v-model="form.role"
            :options="roles"
            label="Roles"
          />
          <q-input
            outlined
            type="password"
            label="Password"
            v-model="form.password"
          />
        </q-card-section>

        <q-card-actions>
          <q-btn
            flat
            label="Create Account"
            color="primary"
            class="full-width"
            @click="register"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userName: "",
        fullName: "",
        role: "",
        password: "",
        rePassword: ""
      },
      roles: ["Donator", "Receiver"],
      forgotPassword: false,
      signUp: false
    };
  },
  methods: {
    authenticate() {
      this.$axios
        .post("user/authenticate", {
          userName: this.form.userName,
          password: this.form.password
        })
        .then(res => {
          this.$q.sessionStorage.set("user", res.data);
          this.$router.push("/dashboard");
        })
        .catch(() => {
          this.form = {
            userName: "",
            password: ""
          };
          this.$q.notify({
            message: "Username / Password not found.",
            color: "red",
            position: "top"
          });
        });
    },
    resetPassword() {
      if (this.form.password == this.form.rePassword) {
        this.$axios
          .patch(`user/forgotPassword/${this.form.username}`, {
            password: this.form.password
          })
          .then(() => {
            this.$q.notify({
              message: "Password Changed",
              color: "light-blue",
              position: "top"
            });
            this.form = {
              userName: "",
              password: "",
              rePassword: ""
            };
          });
      } else {
        this.$q.notify({
          message: "Password and Confirm Pasword Not Same",
          color: "red",
          position: "top"
        });
      }
    },
    register() {
      this.$axios
        .post("user", this.form)
        .then(() => {
          this.form = {
            userName: "",
            fullName: "",
            role: "",
            password: ""
          };
          this.$q.notify({
            message: "Successfully Register",
            color: "light-blue",
            position: "top"
          });
        })
        .catch((res, req) => {
          this.$q.notify({
            message: "Something Wrong",
            color: "red",
            position: "top"
          });
        });
    }
  }
};
</script>
