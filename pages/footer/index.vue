<script lang="ts" setup>
import Swal from "sweetalert2";
import type { Footer } from "~/misc/types";

definePageMeta({
  middleware: ["auth"],
});

const { getFooterByID, updateFooterBy } = useFooter();
const router = useRouter();
const submitting = ref(false)
const footer = ref<Footer>({
  id: '',
  footer_detail: '',
})

onMounted(async () => {
  footer.value = await getFooterByID({ id: 'DEFAULT' })
})

async function onSubmit() {
  try {
    submitting.value = true
    await updateFooterBy(footer.value)
    void Swal.fire({ title: 'สำเร็จ', text: 'บันทึกข้อมูลแล้ว', icon: "success" })
    await router.push({ path: '/footer' });
    console.log(footer.value);
  } catch (e) {
    console.log(e)
  }

  submitting.value = false
}
</script>

<template>
  <v-card elevation="10" class="withbg mx-auto" color="grey-lighten-3">
    <v-card-title>ฟุตเตอร์</v-card-title>
    <v-card-item>
      <v-row>
        <v-col>
          <v-textarea label="ฟุตเตอร์" v-model="footer.footer_detail"> </v-textarea>
        </v-col>
      </v-row>
    </v-card-item>
    <v-card-text class="d-flex flex-wrap justify-center gap-2">
      <v-btn color="save" @click="onSubmit">
        <template v-if="submitting">
          <v-progress-circular class="mr-2" indeterminate color="success" :size="16"></v-progress-circular>
        </template> บันทึก
      </v-btn>
    </v-card-text>
  </v-card>
</template>