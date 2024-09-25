
<script lang="ts" setup>
import { ConTact } from "~~/misc/types";

definePageMeta({ middleware: ["auth"] });
const { getConTactByID } = useConTact();

const contact = ref<ConTact>({
  contact_id: "",
  contact_name: "",
  contact_email: "",
  contact_number: "",
  contact_detail: "",
  web_develop: false,
  app_develop: false,
  out_source: false,
  iot_develop: false,
});

onMounted(async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const query: { [key: number | string]: string } = {};

    for (const [key, value] of params) {
      query[key] = value;
    }

    contact.value = await getConTactByID({ contact_id: query.id });
  } catch (e) {
    console.log(e);
  }
});
</script>
<template>
  <v-breadcrumbs
    :items="[
      { title: 'รายชื่อผู้ติดต่อ', to: '/contact' },
      { title: 'รายละเอียด', disabled: true },
    ]"
  >
    <template v-slot:title="{ item }">{{ item.title.toUpperCase() }}</template>
  </v-breadcrumbs>
  <v-card elevation="10" class="withbg">
    <v-card-text>
      <div class="d-sm-flex align-center pt-sm-2">
        <v-card-title>รายละเอียด</v-card-title>
      </div>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="4">
                <v-label>รหัสผู้ติดต่อ :</v-label>
              </v-col>
              <v-col cols="8">
                <v-label>{{ contact.contact_id }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-label>ชื่อผู้ติดต่อ :</v-label>
              </v-col>
              <v-col cols="8">
                <v-label>{{ contact.contact_name }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-label>อีเมล์ :</v-label>
              </v-col>
              <v-col cols="8">
                <v-label>{{ contact.contact_email }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-label>เบอร์โทร :</v-label>
              </v-col>
              <v-col cols="8">
                <v-label>{{ contact.contact_number }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-label>รายละเอียด :</v-label>
              </v-col>
              <v-col cols="8">
                <v-label>{{ contact.contact_detail }}</v-label>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="d-flex flex-column justify-center " cols="12" md="6">
            <v-row class="text-center justify-center">
            <v-label >งานที่ติดต่อ</v-label>
          </v-row>
            <v-row class="d-flex justify-center">
              <v-col class="py-4" cols="12" sm="5" lg="5"  >
                <v-label v-if="contact.web_develop === 1">Web Development</v-label>
              </v-col>
              <v-col class="py-4" cols="12" sm="2" lg="5">
                <v-label v-if="contact.app_develop === 1">Application Development</v-label>
              </v-col>
              <v-col  class="py-4 " cols="12" sm="5" lg="5">
                <v-label v-if="contact.iot_develop === 1">IoT Development</v-label>
              </v-col>
              <v-col class="py-4" cols="12" sm="5" lg="5" >
                 <v-label v-if="contact.out_source === 1">Out Source</v-label>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-text class="d-flex justify-center mt-4">
      <v-btn color="primary" :to="'/contact'">กลับ</v-btn>
    </v-card-text>
  </v-card>
</template>