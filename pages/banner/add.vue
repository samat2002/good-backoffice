
<script lang="ts" setup>
import Swal from "sweetalert2"
import type { Banner, BannerList } from "~/misc/user";
import defaultUserImage from "@/assets/images/default-user.png"
import errorImage from "@/assets/images/error.png"

definePageMeta({ middleware: ["auth"] });
const { generateBannerID, insertBanner, } = useBanner();
const { public: publicCtx } = useRuntimeConfig()
const router = useRouter();


const submitting = ref(false)
const banner_lists = ref<BannerList[]>([])
const banner = ref<Banner>({
  banner_id: '',
  banner_name: '',
  banner_detail: '',
  banner_img: '',
});

const buffer_image = ref<{
  banner_img: { files?: File[], src: string },
}>({
  banner_img: { src: '' },
})


onMounted(async () => {
  try {
    const id = await generateBannerID()
    banner.value.banner_id = id
  } catch (e) {
    console.log(e)
  }
})

async function onSubmit() {
  if (submitting.value || !validateForm()) return

  try {
    submitting.value = true

    await insertBanner({
      banner: banner.value,
      banner_img: buffer_image.value.banner_img.files,
      banner_lists: banner_lists.value
    });
    void Swal.fire({ title: 'สำเร็จ', text: 'บันทึกข้อมูลแล้ว', icon: "success" })
    await router.push({ path: '/banner' });
  } catch (e) {
    console.log(e)
    submitting.value = false
  }
}

function validateForm(): boolean {
  const {
    banner_id,
    banner_name,
    banner_detail,
  } = banner.value

  if (!(banner_id && banner_name && banner_detail)) {
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
      buffer_image.value.banner_img.src = reader.result as string
    };

    reader.readAsDataURL(file);
  }
}

function clearImage() {
  buffer_image.value.banner_img = { src: '' }
}

function deleteRow(idx: number) {
  banner_lists.value.splice(idx, 1)
}

function addRow() {
  banner_lists.value.push({
    banner_list_id: '',
    banner_id: banner.value.banner_id,
    banner_list_name: ''
  })
}


</script>

<template>
  <v-breadcrumbs :items="[
    { title: 'แบนเนอร์', to: '/banner', },
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
            <v-col>
              <v-col cols="12" sm="6" lg="12">
                <v-label class="mb-2">รหัสแบนเนอร์<span class="text-error ml-1">*</span></v-label>
                <v-text-field v-model="banner.banner_id" density="compact" :rules="[rules.required]"
                  variant="outlined"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" lg="12">
                <v-label class="mb-2">รายละเอียด<span class="text-error ml-1"></span></v-label>
                <v-textarea v-model="banner.banner_detail" density="compact" variant="outlined"
                  class="btn-small"></v-textarea>
              </v-col>
            </v-col>

            <v-col cols="12" sm="6" lg="4">
              <v-label class="mb-2">ชื่อแบนเนอร์<span class="text-error ml-1">*</span></v-label>
              <v-text-field v-model="banner.banner_name" :rules="[rules.required]" density="compact" variant="outlined"
                class="btn-small"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-center" style="max-width: 400px;">
                <v-avatar size="200px">
                  <template v-if="buffer_image.banner_img.src">
                    <v-img :src="buffer_image.banner_img.src" aspect-ratio="1" cover max-height="200px"></v-img>
                  </template>
                  <template v-else-if="banner.banner_img">
                    <v-img :src="`${publicCtx.apiBaseUrl}${banner.banner_img}`" aspect-ratio="1" cover max-height="200px">
                      <template v-slot:error>
                        <v-img :src="errorImage" alt="error"></v-img>
                      </template>
                    </v-img>
                  </template>
                  <template v-else>
                    <v-img :src="defaultUserImage" aspect-ratio="1" max-height="200px"></v-img>
                  </template>
                </v-avatar>
                <v-file-input v-model="buffer_image.banner_img.files" class="mt-4" accept="image/png, image/jpeg"
                  label="รูป (ถ้ามี)" density="compact" @change="changeImage" @click:clear="clearImage"></v-file-input>
              </div>
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
      <v-btn color="muted" :to="'/banner'">ยกเลิก</v-btn>
    </v-card-text>
  </v-card>
</template>

<style></style>