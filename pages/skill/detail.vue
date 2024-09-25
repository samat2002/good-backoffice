
<script lang="ts" setup>
import type { Skill } from "~~/misc/types"

definePageMeta({ middleware: ["auth"] });
const { getSkillByID } = useSkill();

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
</script>
<template>
  <v-breadcrumbs :items="[
    { title: 'ประชื่อประสบการณ์', to: '/skill', },
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
              <v-col cols="12" sm="6" lg="3">
                <v-label>รหัสประชื่อประสบการณ์ :</v-label>
              </v-col>
              <v-col cols="12" sm="6" lg="3">
                <v-label>{{ skill.skill_id }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" lg="3">
                <v-label>ชื่อประสบการณ์ :</v-label>
              </v-col>
              <v-col cols="12" sm="6" lg="3">
                <v-label>{{ skill.skill_name }}</v-label>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-text class="d-flex flex-wrap justify-center gap-2">
      <v-btn type="submit" color="muted" :to="'/skill'">กลับ</v-btn>
    </v-card-text>
  </v-card>
</template>