
<script lang="ts" setup>
import Swal from "sweetalert2"
import type { User } from "~~/misc/types"
import defaultUserImage from "@/assets/images/default-user.png"
import errorImage from "@/assets/images/error.png"
definePageMeta({
  middleware: ["auth"],
});

const { getLicenseBy, } = useLicense();
const { generateUserID, getUserBy, insertUser, } = useUser();
const { public: publicCtx } = useRuntimeConfig()
const router = useRouter();
const submitting = ref(false)
const user = ref<User>({
  user_id: '',
  license_id: '',
  user_firstname: '',
  user_lastname: '',
  user_phone: '',
  user_email: '',
  user_birthday: null,
  user_username: '',
  user_password: '',
  user_address: '',
  user_img: '',
  user_status: 'Active',
});
const username_validate = ref<{
  is_valid: boolean,
  error: string,
}>({
  is_valid: false,
  error: '',
})
const buffer_image = ref<{
  user_img: { files?: File[], src: string },
}>({
  user_img: { src: '' },
})

const status_options: string[] = ['Active', 'Inactive'];

const { data: licenses } = await useAsyncData('licenses', () => getLicenseBy());

const license_options = licenses.value?.docs.map(item => ({
  value: item.license_id,
  title: item.license_name,
}));

onMounted(async () => {
  try {
    const id = await generateUserID()
    user.value.user_id = id
  } catch (e) {
    console.log(e)
  }
})

async function onSubmit() {
  if (submitting.value || !validateForm()) return

  try {
    submitting.value = true

    await insertUser({
      user: user.value,
      user_img: buffer_image.value.user_img.files,
    });

    void Swal.fire({ title: 'สำเร็จ', text: 'บันทึกข้อมูลแล้ว', icon: "success" })
    await router.push({ path: '/user' });
  } catch (e) {
    console.log(e)
    submitting.value = false
  }
}

function validateForm(): boolean {
  const {
    user_id,
    user_firstname,
    user_lastname,
    user_password,
  } = user.value

  if (!(user_id && user_firstname && user_lastname)) {
    void Swal.fire({ text: 'กรุณากรอกข้อมูลให้ครบถ้วน', icon: "warning" })
    return false
  }
  if (!username_validate.value.is_valid) {
    void Swal.fire({ text: username_validate.value.error, icon: "warning" })
    return false
  }
  if (rules.pwd(user_password) !== true) {
    void Swal.fire({ text: 'Password ไม่ถูกต้อง', icon: "warning" })
    return false
  }

  return true
}

async function validateUsername() {
  try {
    user.value.user_username = user.value.user_username.trim()

    if (!user.value.user_username.length) {
      username_validate.value = { is_valid: false, error: "จำเป็นต้องกรอก Username", }

      return
    }

    const duplicate = await getUserBy({ user_username: user.value.user_username })

    if (duplicate.docs.length) {
      username_validate.value = { is_valid: false, error: "ไม่สามารถใช้ Username นี้ได้", }
      return
    }

    username_validate.value = { is_valid: true, error: "", }
  } catch (e) {
    console.log(e)
  }
}

function changeImage(e: Event) {
  const reader = new FileReader();
  const target = e.target as HTMLInputElement;

  if (target.files?.length) {
    const file = target.files[0];

    reader.onloadend = () => {
      buffer_image.value.user_img.src = reader.result as string
    };

    reader.readAsDataURL(file);
  }
}

function clearImage() {
  buffer_image.value.user_img = { src: '' }
}
</script>

<template>
  <v-breadcrumbs :items="[
    { title: 'พนักงาน/ผู้ใช้งาน', to: '/user', },
    { title: 'เพิ่มรายการใหม่', disabled: true, }
  ]">
    <template v-slot:title="{ item }">{{ item.title.toUpperCase() }}</template>
  </v-breadcrumbs>
  <v-card elevation="10" class="withbg">
    <v-card-title>เพิ่มรายการใหม่</v-card-title>
    <v-card-text class="py-4">
      <v-row>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" sm="6" lg="3">
              <v-label class="mb-2">รหัสพนักงาน<span class="text-error ml-1">*</span></v-label>
              <v-text-field v-model="user.user_id" density="compact" :rules="[rules.required]"
                variant="outlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" lg="4">
              <v-label class="mb-2">ชื่อ<span class="text-error ml-1">*</span></v-label>
              <v-text-field v-model="user.user_firstname" :rules="[rules.required]" density="compact" variant="outlined"
                class="btn-small"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-label class="mb-2">สกุล<span class="text-error ml-1">*</span></v-label>
              <v-text-field v-model="user.user_lastname" :rules="[rules.required]" density="compact"
                variant="outlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" lg="4">
              <v-label class="mb-2">วันเกิด (ค.ศ.)</v-label>
              <v-text-field v-model="user.user_birthday" density="compact" variant="outlined" outlined
                type="date"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-label class="mb-2">โทรศัพท์</v-label>
              <v-text-field v-model="user.user_phone" density="compact" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" lg="4">
              <v-label class="mb-2">Email</v-label>
              <v-text-field v-model="user.user_email" :rules="[rules.email]" density="compact"
                variant="outlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-label class="mb-2">ที่อยู่</v-label>
              <v-textarea v-model="user.user_address" density="compact" variant="outlined"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" lg="6">
              <v-label class="mb-2">Username<span class="text-error ml-1">*</span></v-label>
              <v-text-field v-model="user.user_username" :rules="[rules.required]" @update:focused="validateUsername"
                :error-messages="username_validate.error" density="compact" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" lg="6">
              <v-label class="mb-2">Password<span class="text-error ml-1">*</span></v-label>
              <v-text-field v-model="user.user_password" :rules="[rules.pwd]" density="compact"
                variant="outlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" lg="4">
              <v-label class="mb-2">สิทธ์การใช้งาน</v-label>
              <v-select v-model="user.license_id" :items="license_options" density="compact"
                variant="outlined"></v-select>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
              <v-label class="mb-2">สถานะ</v-label>
              <v-select v-model="user.user_status" :items="status_options" density="compact"
                variant="outlined"></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-center" style="max-width: 400px;">
            <v-avatar size="200px">
              <template v-if="buffer_image.user_img.src">
                <v-img :src="buffer_image.user_img.src" aspect-ratio="1" cover max-height="200px"></v-img>
              </template>
              <template v-else-if="user.user_img">
                <v-img :src="`${publicCtx.apiBaseUrl}${user.user_img}`" aspect-ratio="1" cover max-height="200px">
                  <template v-slot:error>
                    <v-img :src="errorImage" alt="error"></v-img>
                  </template>
                </v-img>
              </template>
              <template v-else>
                <v-img :src="defaultUserImage" aspect-ratio="1" max-height="200px"></v-img>
              </template>
            </v-avatar>
            <v-file-input v-model="buffer_image.user_img.files" class="mt-4" accept="image/png, image/jpeg"
              label="รูป (ถ้ามี)" density="compact" @change="changeImage" @click:clear="clearImage"></v-file-input>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text class="d-flex flex-wrap justify-center gap-2">
      <v-btn color="save" @click="onSubmit">
        <template v-if="submitting">
          <v-progress-circular class="mr-2" indeterminate color="success" :size="16"></v-progress-circular>
        </template> บันทึก
      </v-btn>
      <v-btn color="muted" :to="'/user'">ยกเลิก</v-btn>
    </v-card-text>
  </v-card>
</template>