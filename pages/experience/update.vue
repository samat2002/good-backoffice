<script lang="ts" setup>
import Swal from "sweetalert2"
import type { Experience } from "~~/misc/types"

definePageMeta({ middleware: ["auth"] });
const { getExperienceByID, updateExperienceBy } = useExperience();
const router = useRouter();
const submitting = ref(false)
const experience = ref<Experience>({
  experience_id: '',
  experience_name: '',
});

onMounted(async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const query: { [key: number | string]: string } = {};

    for (const [key, value] of params) {
      query[key] = value;
    }

    experience.value = await getExperienceByID({ experience_id: query.id })
  } catch (e) {
    console.log(e)
  }
})

async function onSubmit() {
  if (submitting.value || !validateForm()) return

  try {
    submitting.value = true
    await updateExperienceBy(experience.value);
    void Swal.fire({ title: 'สำเร็จ', text: 'บันทึกข้อมูลแล้ว', icon: "success" })
    await router.push({ path: '/experience' });
  } catch (e) {
    console.log(e)
    submitting.value = false
  }
}

function validateForm(): boolean {
  if (!(experience.value.experience_id && experience.value.experience_name)) {
    void Swal.fire({ text: 'กรุณากรอกข้อมูลให้ครบถ้วน', icon: "warning" })
    return false
  }

  return true
}
</script>

<template>
  <v-breadcrumbs :items="[
    { title: 'ประสบการณ์', to: '/experience', },
    { title: 'แก้ไขรายการ', disabled: true, }
  ]">
    <template v-slot:title="{ item }">{{ item.title.toUpperCase() }}</template>
  </v-breadcrumbs>
  <v-card elevation="10" class="withbg">
    <v-card-title>แก้ไขรายการ</v-card-title>
    <v-card-text class="py-4">
      <v-row>
        <v-col cols="12" sm="6" lg="4">
          <v-label class="mb-2">ชื่อประสบการณ์<span class="text-error ml-1">*</span></v-label>
          <v-text-field v-model="experience.experience_name" :rules="[rules.required]" density="compact"
            variant="outlined" class="btn-small"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text class="d-flex flex-wrap justify-center gap-2">
      <v-btn color="save" @click="onSubmit">
        <template v-if="submitting">
          <v-progress-circular class="mr-2" indeterminate color="success" :size="16"></v-progress-circular>
        </template> บันทึก
      </v-btn>
      <v-btn color="muted" :to="'/experience'">ยกเลิก</v-btn>
    </v-card-text>
  </v-card>
</template>