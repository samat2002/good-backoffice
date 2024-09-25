
<script lang="ts" setup>
import type { Banner, BannerList } from "~~/misc/types"
import defaultUserImage from "@/assets/images/default-user.png"
import errorImage from "@/assets/images/error.png"

definePageMeta({ middleware: ["auth"] });
const { getBannerByID } = useBanner();
const { getBannerListBy } = useBannerList();


const { public: publicCtx } = useRuntimeConfig()

const banner_lists = ref<BannerList[]>([])
const banner = ref<Banner>({
  banner_id: '',
  banner_name: '',
  banner_detail: '',
  banner_img: '',
});


onMounted(async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const query: { [key: number | string]: string } = {};

    for (const [key, value] of params) {
      query[key] = value;
    }

    banner.value = await getBannerByID({ banner_id: query.id })
    banner_lists.value = await getBannerListBy({ banner_id: query.id }).then(res => res.docs)
    console.log('banner', banner.value);
  } catch (e) {
    console.log(e)
  }
})
</script>
<template>
  <v-breadcrumbs :items="[
    { title: 'แบนเนอร์', to: '/banner', },
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
                <v-label>{{ banner.banner_id }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" lg="2">
                <v-label>ชื่อแบนเนอร์</v-label>
              </v-col>
              <v-col cols="12" sm="6" lg="2">
                <v-label>{{ banner.banner_name }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" lg="2">
                <v-label>รายละเอียด</v-label>
              </v-col>
              <v-col cols="12" sm="6" lg="2">
                <v-label>{{ banner.banner_detail }}</v-label>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="mt-10" cols="12" sm="3" lg="4">
            <v-img :src="`${banner.banner_img ? `${publicCtx.apiBaseUrl}${banner.banner_img}` : defaultUserImage}`" cover
              alt="banner">
              <template v-slot:error>
                <v-img :src="errorImage" cover alt="error"></v-img>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-text class="d-flex flex-wrap justify-center gap-2">
      <v-btn type="submit" color="muted" :to="'/banner'">กลับ</v-btn>
    </v-card-text>
  </v-card>
</template>