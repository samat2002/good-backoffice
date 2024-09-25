
<script lang="ts" setup>
import type { SkillList, Skill } from "~~/misc/types"
import defaultUserImage from "@/assets/images/default-user.png"
import errorImage from "@/assets/images/error.png"

definePageMeta({ middleware: ["auth"] });
const { getSkillListByID } = useSkillList();
const { getSkillBy } = useSkill();


const { public: publicCtx } = useRuntimeConfig()

const skills = ref<Skill[]>([])
const skill_list = ref<SkillList>({
  skill_list_id: '',
  skill_list_name: '',
  skill_list_detail: '',
  skill_list_img: '',
});


onMounted(async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const query: { [key: number | string]: string } = {};

    for (const [key, value] of params) {
      query[key] = value;
    }

    skill_list.value = await getSkillListByID({ skill_list_id: query.id })
    skills.value = await getSkillBy({ skill_list_id: query.id }).then(res => res.docs)
    console.log('skill_list', skill_list.value);
  } catch (e) {
    console.log(e)
  }
})
</script>
<template>
  <v-breadcrumbs :items="[
    { title: 'แบนเนอร์', to: '/skill-list', },
    { title: 'รายละเอียด', disabled: true, }
  ]">
    <template v-slot:title="{ item }">{{ item.title.toUpperCase() }}</template>
  </v-breadcrumbs>
  <v-card elevation="10" class="withbg">
    <v-card-text>
      <div class="d-sm-flex align-center  pt-sm-2">
        <v-card-title>รายละเอียด</v-card-title>
      </div>
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12" sm="6" lg="2">
                <v-label>รหัสแบนเนอร์</v-label>
              </v-col>
              <v-col cols="12" sm="6" lg="2">
                <v-label>{{ skill_list.skill_list_id }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" lg="2">
                <v-label>ชื่อแบนเนอร์</v-label>
              </v-col>
              <v-col cols="12" sm="6" lg="2">
                <v-label>{{ skill_list.skill_list_name }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" lg="2">
                <v-label>รายละเอียด</v-label>
              </v-col>
              <v-col cols="12" sm="6" lg="2">
                <v-label>{{ skill_list.skill_list_detail }}</v-label>
              </v-col>
            </v-row>
          </v-col>
          <v-row>
            <v-col class="mt-10" cols="12" sm="3" lg="4">
              <v-img
                :src="`${skill_list.skill_list_img ? `${publicCtx.apiBaseUrl}${skill_list.skill_list_img}` : defaultUserImage}`"
                cover alt="skill_list">
                <template v-slot:error>
                  <v-img :src="errorImage" cover alt="error"></v-img>
                </template>
              </v-img>
            </v-col>
          </v-row>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-text class="d-flex flex-wrap justify-center gap-2">
      <v-btn type="submit" color="muted" :to="'/skill-list'">กลับ</v-btn>
    </v-card-text>
  </v-card>
</template>