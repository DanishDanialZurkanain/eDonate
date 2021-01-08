<template>
  <div class="q-pa-md">
    <q-page>
      <q-card class="my-cardrow">
        <q-tabs
          v-model="tab"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="blood" label="🩸 Blood" />
          <q-tab name="food" label="🥙 Food" />
          <q-tab name="household" label="🧸 Household" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="blood">
            <q-card-section>
              <div class="q-gutter-y-md">
                <q-select
                  outlined
                  :options="typeOfHelp"
                  v-model="bloodForm.typeOfHelp"
                  label="Please Select One"
                />
                <q-input
                  outlined
                  label="Full Name"
                  v-model="bloodForm.fullName"
                />
                <q-input
                  outlined
                  label="Phone Number"
                  v-model="bloodForm.phoneNumber"
                />
                <q-select
                  outlined
                  :options="bloodType"
                  v-model="bloodForm.bloodType"
                  label="Blood Type"
                />
                <q-input
                  outlined
                  v-model="bloodForm.address"
                  label="Address"
                  type="textarea"
                />
                <q-input
                  outlined
                  label="Date"
                  v-model="bloodForm.date"
                  type="date"
                  stack-label
                />
                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="bloodForm.emergency" val="Urgent" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Emergency</q-item-label>
                    <q-item-label caption>Need Urgently </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio
                      v-model="bloodForm.selectedUrgent"
                      val="Not Urgent"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Not Emergency</q-item-label>
                    <q-item-label caption>Doesn't Need Urgently </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-btn
                @click="submitBlood"
                outline
                class="full-width"
                color="primary"
                label="Submit"
              />
            </q-card-section>
          </q-tab-panel>

          <q-tab-panel name="food">
            <q-card-section>
              <div class="q-gutter-y-md">
                <q-select
                  outlined
                  :options="typeOfHelp"
                  v-model="foodForm.typeOfHelp"
                  label="Please Select One"
                />
                <q-input
                  outlined
                  label="Family Member"
                  v-model="foodForm.familyMember"
                />
                <q-input outlined label="Name" v-model="foodForm.fullName" />
                <q-input
                  outlined
                  label="Phone Number"
                  v-model="foodForm.phoneNumber"
                />
                <q-input
                  outlined
                  label="Quantity"
                  v-model="foodForm.quantity"
                />
                <q-input
                  outlined
                  v-model="foodForm.address"
                  label="Address"
                  type="textarea"
                />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-btn
                @click="submitFood"
                outline
                class="full-width"
                color="primary"
                label="Submit"
              />
            </q-card-section>
          </q-tab-panel>

          <q-tab-panel name="household">
            <q-card-section>
              <div class="q-gutter-y-md">
                <q-select
                  outlined
                  :options="typeOfHelp"
                  v-model="householdForm.typeOfHelp"
                  label="Please Select One"
                />
                <q-input
                  outlined
                  label="Name"
                  v-model="householdForm.fullName"
                />
                <q-input
                  outlined
                  label="Phone Number"
                  v-model="householdForm.phoneNumber"
                />
                <q-input
                  outlined
                  label="Family Member"
                  v-model="householdForm.familyMember"
                />
                <q-input
                  outlined
                  v-model="householdForm.address"
                  label="Address"
                  type="textarea"
                />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-btn
                @click="submitHouseHold"
                outline
                class="full-width"
                color="primary"
                label="Submit"
              />
            </q-card-section>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      value: [],
      tab: "blood",
      bloodForm: {
        typeOfHelp: "",
        bloodType: "",
        fullName: "",
        phoneNumber: "",
        address: "",
        familyMember: "",
        emergency: "",
        date: ""
      },
      foodForm: {
        typeOfHelp: "",
        familyMember: "",
        fullName: "",
        phoneNumber: "",
        address: "",
        quantity: ""
      },
      householdForm: {
        typeOfHelp: "",
        fullName: "",
        phoneNumber: "",
        familyMember: "",
        address: ""
      },
      typeOfHelp: ["I Need Help", "I Want to Help"],
      bloodType: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]
    };
  },
  mounted() {
    this.getValue();
  },
  methods: {
    getValue() {
      this.value = this.$q.sessionStorage.getItem("user");
    },
    selectView(selected) {
      this.selected = selected;
    },
    submitBlood() {
      this.$axios
        .post("/receiver", {
          typeOfNeed: "Blood",
          status: "Active",
          typeOfHelp: this.bloodForm.typeOfHelp,
          bloodType: this.bloodForm.bloodType,
          fullName: this.bloodForm.fullName,
          phoneNumber: this.bloodForm.phoneNumber,
          address: this.bloodForm.address,
          emergency: this.bloodForm.emergency,
          date: this.bloodForm.date
        })
        .then(() => {
          (this.bloodForm = {
            typeOfHelp: "",
            bloodType: "",
            fullName: "",
            phoneNumber: "",
            address: "",
            emergency: "",
            date: ""
          }),
            this.$q.notify({
              message: "Successfully Saved",
              color: "light-blue",
              position: "top"
            });
        });
    },
    submitFood() {
      this.$axios
        .post("/receiver", {
          typeOfNeed: "Food",
          status: "Active",
          typeOfHelp: this.foodForm.typeOfHelp,
          familyMember: this.foodForm.familyMember,
          fullName: this.foodForm.fullName,
          phoneNumber: this.foodForm.phoneNumber,
          address: this.foodForm.address,
          quantity: this.foodForm.quantity
        })
        .then(() => {
          (this.foodForm = {
            typeOfHelp: "",
            familyMember: "",
            fullName: "",
            phoneNumber: "",
            address: "",
            quantity: ""
          }),
            this.$q.notify({
              message: "Successfully Saved",
              color: "light-blue",
              position: "top"
            });
        });
    },
    submitHouseHold() {
      this.$axios
        .post("/receiver", {
          typeOfNeed: "Household",
          status: "Active",
          typeOfHelp: this.householdForm.typeOfHelp,
          familyMember: this.householdForm.familyMember,
          fullName: this.householdForm.fullName,
          phoneNumber: this.householdForm.phoneNumber,
          address: this.householdForm.address
        })
        .then(() => {
          (this.householdForm = {
            typeOfHelp: "",
            familyMember: "",
            fullName: "",
            phoneNumber: "",
            address: ""
          }),
            this.$q.notify({
              message: "Successfully Saved",
              color: "light-blue",
              position: "top"
            });
        });
    }
  }
};
</script>
