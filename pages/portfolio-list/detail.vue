
<script lang="ts" setup>
import type { PortfolioList, Portfolio } from "~~/misc/types"
import defaultUserImage from "@/assets/images/default-user.png"
import errorImage from "@/assets/images/error.png"

definePageMeta({ middleware: ["auth"] });
const { getPortfolioListByID } = usePortfolioList();
const { getPortfolioBy } = usePortfolio();


const { public: publicCtx } = useRuntimeConfig()

const portfolios = ref<Portfolio[]>([])
const portfolio_list = ref<PortfolioList>({
  portfolio_list_id: '',
  portfolio_list_name: '',
  portfolio_list_detail: '',
  portfolio_list_img: '',
});


onMounted(async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const query: { [key: number | string]: string } = {};

    for (const [key, value] of params) {
      query[key] = value;
    }

    portfolio_list.value = await getPortfolioListByID({ portfolio_list_id: query.id })
    portfolios.value = await getPortfolioBy({ portfolio_list_id: query.id }).then(res => res.docs)
    console.log('portfolio_list', portfolio_list.value);
  } catch (e) {
    console.log(e)
  }
})
</script>
<template>
  <v-breadcrumbs :items="[
    { title: 'แบนเนอร์', to: '/portfolio-list', },
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
                <v-label>{{ portfolio_list.portfolio_list_id }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" lg="2">
                <v-label>ชื่อแบนเนอร์</v-label>
              </v-col>
              <v-col cols="12" sm="6" lg="2">
                <v-label>{{ portfolio_list.portfolio_list_name }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" lg="2">
                <v-label>รายละเอียด</v-label>
              </v-col>
              <v-col cols="12" sm="6" lg="2">
                <v-label>{{ portfolio_list.portfolio_list_detail }}</v-label>
              </v-col>
            </v-row>
          </v-col>
          <v-row>
            <v-col class="mt-10" cols="12" sm="3" lg="4">
              <v-img
                :src="`${portfolio_list.portfolio_list_img ? `${publicCtx.apiBaseUrl}${portfolio_list.portfolio_list_img}` : defaultUserImage}`"
                cover alt="portfolio_list">
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
      <v-btn type="submit" color="muted" :to="'/portfolio-list'">กลับ</v-btn>
    </v-card-text>
  </v-card>
</template>