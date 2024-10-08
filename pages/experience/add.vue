<script lang="ts" setup>
import Swal from "sweetalert2"
import { onMounted } from "vue";
import useExperience from "~/composables/useExperience";
import type { Experience } from "~~/misc/types"

definePageMeta({ middleware: ["auth"] });
const { generateExperienceID, insertExperience, } = useExperience();
const router = useRouter();

const submitting = ref(false)
const experience = ref<Experience>({
  experience_id: '',
  experience_name: '',
});

onMounted(async () => {
  try {
    const id = await generateExperienceID()
    experience.value.experience_id = id
  } catch (e) {
    console.log(e)
  }
})

async function onSubmit() {
  if (submitting.value || !validateForm()) return

  try {
    submitting.value = true

    await insertExperience(experience.value);
    void Swal.fire({ title: 'สำเร็จ', text: 'บันทึกข้อมูลแล้ว', icon: "success" })
    await router.push({ path: '/experience' });
  } catch (e) {
    console.log(e)
    submitting.value = false
  }
}

function validateForm(): boolean {
  const {
    experience_id,
    experience_name,
  } = experience.value

  if (!(experience_id && experience_name)) {
    void Swal.fire({ text: 'กรุณากรอกข้อมูลให้ครบถ้วน', icon: "warning" })
    return false
  }
  return true
}
</script>

<template>
  <v-breadcrumbs :items="[
    { title: 'ประสบการณ์', to: '/experience', },
    { title: 'เพิ่มรายการใหม่', disabled: true, }
  ]">
    <template v-slot:title="{ item }">{{ item.title.toUpperCase() }}</template>
  </v-breadcrumbs>
  <v-card elevation="10" class="withbg">
    <v-card-title>เพิ่มรายการใหม่</v-card-title>
    <v-card-text class="py-4">
      <v-row>
        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="12" sm="6" lg="3">
              <v-label class="mb-2">รหัสประสบการณ์<span class="text-error ml-1">*</span></v-label>
              <v-text-field v-model="experience.experience_id" density="compact" :rules="[rules.required]"
                variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-label class="mb-2">ชื่อประสบการณ์<span class="text-error ml-1">*</span></v-label>
              <v-text-field v-model="experience.experience_name" :rules="[rules.required]" density="compact"
                variant="outlined" class="btn-small"></v-text-field>
            </v-col>
          </v-row>
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