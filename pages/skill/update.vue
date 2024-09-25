<script lang="ts" setup>
import Swal from "sweetalert2"
import type { Skill } from "~~/misc/types"

definePageMeta({ middleware: ["auth"] });
const { getSkillByID, updateSkillBy } = useSkill();
const router = useRouter();
const submitting = ref(false)
const skill = ref<Skill>({
  skill_id: '',
  skill_list_id: '',
  skill_name: '',
});

onMounted(async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const query: { [key: number | string]: string } = {};

    for (const [key, value] of params) {
      query[key] = value;
    }

    skill.value = await getSkillByID({ skill_id: query.id })
  } catch (e) {
    console.log(e)
  }
})

async function onSubmit() {
  if (submitting.value || !validateForm()) return

  try {
    submitting.value = true
    await updateSkillBy(skill.value);
    void Swal.fire({ title: 'สำเร็จ', text: 'บันทึกข้อมูลแล้ว', icon: "success" })
    await router.push({ path: '/skill' });
  } catch (e) {
    console.log(e)
    submitting.value = false
  }
}

function validateForm(): boolean {
  if (!(skill.value.skill_id && skill.value.skill_name)) {
    void Swal.fire({ text: 'กรุณากรอกข้อมูลให้ครบถ้วน', icon: "warning" })
    return false
  }

  return true
}
</script>

<template>
  <v-breadcrumbs :items="[
    { title: 'ประสบการณ์', to: '/skill', },
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
          <v-text-field v-model="skill.skill_name" :rules="[rules.required]" density="compact" variant="outlined"
            class="btn-small"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text class="d-flex flex-wrap justify-center gap-2">
      <v-btn color="save" @click="onSubmit">
        <template v-if="submitting">
          <v-progress-circular class="mr-2" indeterminate color="success" :size="16"></v-progress-circular>
        </template> บันทึก
      </v-btn>
      <v-btn color="muted" :to="'/skill'">ยกเลิก</v-btn>
    </v-card-text>
  </v-card>
</template>