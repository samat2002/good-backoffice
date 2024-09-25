<script lang="ts" setup>
import Swal from "sweetalert2";
import { onMounted } from "vue";
import { ref } from "vue";
import { defineComponent } from "vue";
import type { ConTact, Product } from "~/misc/types";

definePageMeta({ middleware: ["auth"] });
const { generateConTactID, insertConTact } = useConTact();
const router = useRouter();

const submitting = ref(false);
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
    const id = await generateConTactID();
    contact.value.contact_id = id;
  } catch (e) {
    console.log(e);
  }
});

async function onSubmit() {
  if (submitting.value || !validateForm()) return;

  try {
    submitting.value = true;

    await insertConTact(contact.value);
    void Swal.fire({
      title: "สำเร็จ",
      text: "บันทึกข้อมูลแล้ว",
      icon: "success",
    });
    await router.push({ path: "/contact" });
  } catch (e) {
    console.log(e);
    submitting.value = false;
  }
}

function validateForm(): boolean {
  const { contact_id, contact_name } = contact.value;

  if (!(contact_id && contact_name)) {
    void Swal.fire({ text: "กรุณากรอกข้อมูลให้ครบถ้วน", icon: "warning" });
    return false;
  }
  return true;
}
const toggleWeb = () => {
  contact.value.web_develop = !contact.value.web_develop
}
const toggleApp = () => {
  contact.value.app_develop = !contact.value.app_develop
}
const toggleIot = () => {
  contact.value.iot_develop = !contact.value.iot_develop
}
const toggleOutSource = () => {
  contact.value.out_source = !contact.value.out_source
}
</script>

<template>
  <v-breadcrumbs :items="[
    { title: 'ประสบการณ์', to: '/contact' },
    { title: 'เพิ่มรายการใหม่', disabled: true },
  ]">
    <template v-slot:title="{ item }">{{ item.title.toUpperCase() }}</template>
  </v-breadcrumbs>
  <v-card elevation="10" class="withbg">
    <v-card-title>เพิ่มรายการใหม่</v-card-title>
    <v-card-text class="py-4">
      <v-col cols="12" md="12">
        <v-row>
          <v-col cols="12" sm="6" lg="6">
            <v-label class="mb-2">รหัสการติดต่อ<span class="text-error ml-1">*</span></v-label>
            <v-text-field v-model="contact.contact_id" density="compact" :rules="[rules.required]"
              variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" lg="6">
            <v-label class="mb-2">ชื่อ<span class="text-error ml-1">*</span></v-label>
            <v-text-field v-model="contact.contact_name" :rules="[rules.required]" density="compact" variant="outlined"
              class="btn-small"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" lg="6">
            <v-label class="mb-2">อีเมล<span class="text-error ml-1">*</span></v-label>
            <v-text-field v-model="contact.contact_email" density="compact" :rules="[rules.required]"
              variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" lg="6">
            <v-label class="mb-2">เบอร์<span class="text-error ml-1">*</span></v-label>
            <v-text-field v-model="contact.contact_number" :rules="[rules.required]" density="compact" variant="outlined"
              class="btn-small"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" lg="12">
            <v-label class="mb-2">รายละเอียด<span class="text-error ml-1"></span></v-label>
            <v-textarea v-model="contact.contact_detail" density="compact" variant="outlined"
              class="btn-small"></v-textarea>
          </v-col>
        </v-row>
      </v-col>
    </v-card-text>
    <div>
      <v-col cols="12" sm="6" lg="12">
        <v-col>
          <h4 class="text-center py-1">ข้อความเกี่ยวกับ</h4>
          <v-btn-toggle class="d-flex justify-space-evenly " multiple selected-class="text-primary bg-primary"
            variant="outlined" divided>
            <v-btn class="bg-surface border rounded-xl border-0 border-primary" v-model="contact.web_develop"
              @click="toggleWeb">
              Web evelopment
            </v-btn>
            <v-btn class="bg-surface border rounded-xl border-0 border-primary" v-model="contact.app_develop"
              @click="toggleApp">
              Application Development
            </v-btn>
          </v-btn-toggle>
          <v-btn-toggle class="d-flex justify-space-evenly mt-2 " multiple selected-class="text-primary bg-primary"
            variant="outlined" divided>
            <v-btn class="bg-surface border rounded-xl border-0 border-primary" v-model="contact.iot_develop"
              @click="toggleOutSource">
              Out Source
            </v-btn>
            <v-btn class="bg-surface border rounded-xl border-0 border-primary" v-model="contact.out_source"
              @click="toggleIot">
              Iot Development
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-col>
    </div>
    <v-card-text class="d-flex flex-wrap justify-center gap-2">
      <v-btn color="save" @click="onSubmit">
        <template v-if="submitting">
          <v-progress-circular class="mr-2" indeterminate color="success" :size="16"></v-progress-circular>
        </template>
        บันทึก
      </v-btn>
      <v-btn color="muted" :to="'/contact'">ยกเลิก</v-btn>
    </v-card-text>
  </v-card>
</template>