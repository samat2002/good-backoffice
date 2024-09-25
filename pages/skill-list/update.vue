
<script lang="ts" setup>
import Swal from "sweetalert2"
import type { Skill, SkillList } from "~~/misc/types"
import defaultUserImage from "@/assets/images/default-user.png"
import errorImage from "@/assets/images/error.png"


definePageMeta({ middleware: ["auth"] });
const { getSkillBy, updateSkillBy } = useSkill();
const { getSkillListByID, updateSkillListBy } = useSkillList();

const router = useRouter();

const { public: publicCtx } = useRuntimeConfig()
const submitting = ref(false)
const skills = ref<Skill[]>([])
const skill_list = ref<SkillList>({
  skill_list_id: '',
  skill_list_name: '',
  skill_list_detail: '',
});

const buffer_image = ref<{
  skill_list_img: { files?: File[], src: string },
}>({
  skill_list_img: { src: '' },
})


onMounted(async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const query: { [key: number | string]: string } = {};

    for (const [key, value] of params) {
      query[key] = value;
    }

    skill_list.value = await getSkillListByID({ skill_list_id: query.id }),
      skills.value = await getSkillBy({ skill_list_id: query.id }).then(res => res.docs)
  } catch (e) {
    console.log(e)
  }
})

async function onSubmit() {
  if (submitting.value || !validateForm()) return

  try {
    submitting.value = true
    await updateSkillListBy({
      skill_list: skill_list.value,
      skill_list_img: buffer_image.value.skill_list_img.files,
      skills: skills.value
    });
    void Swal.fire({ title: 'สำเร็จ', text: 'บันทึกข้อมูลแล้ว', icon: "success" })
    await router.push({ path: '/skill-list' });
  } catch (e) {
    console.log(e)
    submitting.value = false
  }
}

function validateForm(): boolean {
  if (!(skill_list.value.skill_list_id && skill_list.value.skill_list_name)) {
    void Swal.fire({ text: 'กรุณากรอกข้อมูลให้ครบถ้วน', icon: "warning" })
    return false
  }

  return true
}

function changeImage(e: Event) {
  const reader = new FileReader();
  const target = e.target as HTMLInputElement;

  if (target.files?.length) {
    const file = target.files[0];

    reader.onloadend = () => {
      buffer_image.value.skill_list_img.src = reader.result as string
    };

    reader.readAsDataURL(file);
  }
}

function clearImage() {
  buffer_image.value.skill_list_img = { src: '' }
}

function deleteRow(idx: number) {
  skills.value.splice(idx, 1)
}

function addRow() {
  skills.value.push({
    skill_id: '',
    skill_list_id: skill_list.value.skill_list_id,
    skill_name: ''
  })
}


</script>

<template>
  <v-breadcrumbs :items="[
    { title: 'แบนเนอร์', to: '/skill-list', },
    { title: 'แก้ไขรายการ', disabled: true, }
  ]">
    <template v-slot:title="{ item }">{{ item.title.toUpperCase() }}</template>
  </v-breadcrumbs>
  <v-card elevation="10" class="withbg">
    <v-card-title>แก้ไขรายการ</v-card-title>
    <v-card-text class="py-4">
      <v-col>
        <v-row>
          <v-col>
            <v-col cols="12" sm="6" lg="12">
              <v-label class="mb-2">รหัสแบนเนอร์<span class="text-error ml-1">*</span></v-label>
              <v-text-field v-model="skill_list.skill_list_id" density="compact" :rules="[rules.required]"
                variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" lg="12">
              <v-label class="mb-2">รายละเอียด<span class="text-error ml-1"></span></v-label>
              <v-text-field v-model="skill_list.skill_list_detail" density="compact" variant="outlined"
                class="btn-small"></v-text-field>
            </v-col>
          </v-col>
          <v-col cols="12" sm="6" lg="6">
            <v-label class="mb-2">ชื่อแบนเนอร์<span class="text-error ml-1"></span></v-label>
            <v-text-field v-model="skill_list.skill_list_name" density="compact" variant="outlined"
              class="btn-small"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" class="mt-4 mb-4" style="overflow-x: auto;">
            
          </v-col>
          <v-col cols="4" md="4">
            <div class="text-center" style="max-width: 400px;">
              <v-avatar size="200px">
                <template v-if="buffer_image.skill_list_img.src">
                  <v-img :src="buffer_image.skill_list_img.src" aspect-ratio="1" cover max-height="200px"></v-img>
                </template>
                <template v-else-if="skill_list.skill_list_img">
                  <v-img :src="`${publicCtx.apiBaseUrl}${skill_list.skill_list_img}`" aspect-ratio="1" cover
                    max-height="200px">
                    <template v-slot:error>
                      <v-img :src="errorImage" alt="error"></v-img>
                    </template>
                  </v-img>
                </template>
                <template v-else>
                  <v-img :src="defaultUserImage" aspect-ratio="1" max-height="200px"></v-img>
                </template>
              </v-avatar>
              <v-file-input v-model="buffer_image.skill_list_img.files" class="mt-4" accept="image/png, image/jpeg"
                label="รูป (ถ้ามี)" density="compact" @change="changeImage" @click:clear="clearImage"></v-file-input>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-card-text>
    <v-card-text class="d-flex flex-wrap justify-center gap-2">
      <v-btn color="save" @click="onSubmit">
        <template v-if="submitting">
          <v-progress-circular class="mr-2" indeterminate color="success" :size="16"></v-progress-circular>
        </template> บันทึก
      </v-btn>
      <v-btn color="muted" :to="'/skill-list'">ยกเลิก</v-btn>
    </v-card-text>
  </v-card>
</template>