<script lang="ts" setup>

definePageMeta({
  middleware: ["auth"],
});

const pending = ref(true)
const current_date = ref<Date>(new Date())

onMounted(async () => {
  try {

    await fetchData()
  } catch (e) {
    console.log(e)
  }
})

async function fetchData() {
  try {

  } catch (e) {
    console.log(e)
  }
  pending.value = false
}

</script>

<template>
  <v-card elevation="10" class="withbg mb-n4" color="grey-lighten-3">
    <v-card-item>
      <v-row class="d-flex justify-space-between my-4 mx-4">
        <v-col>
          <h1 class="text-center my-4">คู่มือการใช้งาน</h1>
          <p>banner ผมได้ทำเป็น carousel ไว้ เผื่อได้ไช้นะคับ จะได้เลื่อนหลายๆรูปได้ ส่วนเนื่อหาของ banner
            เปลี่ยนไม่ได้นะคับ ผมกำหนดไว้เป็นเเค่ index 0 คือของอันเเรกเท่านั้น</p><br>
          <hr>
          <p class="">เนื่องจากเราสร้าง list img ไม่ได้ จึงได้เเยกรูปออกมาทีละรูปเเทน เเละไม่ได้ link กับหัวข้อด้วย
            เช่น skill_name
            ก็เป็นเเค่ skill_name ไม่ได้ไปเชื่อมกับรูปภาพอื่นๆ
            เเละดูเหมือนจะมีทั้งหมดเเค่ 25 รูป ไม่มีมาก หรือน้อยไปกว่านั้น
          </p><br>
          <hr>
          <p>portfolio หน้าเมนู portfolio สามารถเพิ่มเมนูเพิ่มได้ ปัญหาคือรูป ถ้าเพิ่มไปมากกว่านี้ ในหน้า all ที่เป็น
            default ไม่มีปัญหาเพราะเลือกรูปภาพมาหมด
            ส่วน link อื่นๆที่เพิ่มมาจากหน้าเมนู เช่น Industry Education Outsource จะมีรูปภาพของตัวเอง
            ซึ่งผมไม่ทราบเท่าไหร่ว่ารูปไหนเป็นของอันไหนบ้าง จึงไม่ได้ทำไห้ตรงกับรูปภาพ
            เเละส่วนของโค้ก็ไม่ได้ดี เนื่องจากเอาเลข index มากำหนดเลยว่า start ที่ไหน stop ที่ไหน เช่น
            portfolio_lists.slice(2, 5) นี่คือโค้ส่วนหน้าบ้านของ portfolio_outsource
            นั่นคือ ถ้าจะมาจัดการทีหลังไห้ตรงกับ tag Industry Education Outsource ต้องมาเปลี่ยนโค้ดทีหลังนะคับทีหลัง
          </p><br>
          <hr>
          <p>footer ไม่ได้ใช้งานนะคับ ไม่รู้จะไส่ตรงไหนดี</p>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>

<style scoped>
.img {

  width: 50%;
  height: 50%;
}
</style>