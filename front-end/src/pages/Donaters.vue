<template>
  <q-page>
    <div class="q-pa-md">
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
                  v-model="bloodType"
                  :options="listBloodType"
                  label="Blood Type"
                />
                <q-input outlined label="Full Name" />
                <q-input outlined label="Venue" type="textarea" />
                <q-input outlined label="Date" type="date" stack-label />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-btn
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
                <q-input outlined label="Ful Name" />
                <q-input outlined label="Number of People" />
                <q-input outlined label="Venue" type="textarea" />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-btn
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
                <q-input outlined label="Ful Name" />
                <q-input outlined label="Needed" />
                <q-input outlined label="Venue" type="textarea" />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-btn
                outline
                class="full-width"
                color="primary"
                label="Submit"
              />
            </q-card-section>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: "blood",
      selected: "",
      bloodType: "",
      listBloodType: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]
    };
  },
  methods: {
    selectView(selected) {
      this.selected = selected;
    }
  }
};
</script>
