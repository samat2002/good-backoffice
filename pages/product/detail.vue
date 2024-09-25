
<script lang="ts" setup>
import type { Product } from "~~/misc/types"
import defaultUserImage from "@/assets/images/default-user.png"
import errorImage from "@/assets/images/error.png"

definePageMeta({ middleware: ["auth"] });
const { getProductByID } = useProduct();
const { public: publicCtx } = useRuntimeConfig()

const product = ref<Product>({
  product_id: '',
  product_name: '',
  product_detail: '',
  product_img: '',
});


onMounted(async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const query: { [key: number | string]: string } = {};

    for (const [key, value] of params) {
      query[key] = value;
    }

    product.value = await getProductByID({ product_id: query.id })
  } catch (e) {
    console.log(e)
  }
})
</script>
<template>
  <v-breadcrumbs :items="[
    { title: 'สินค้า', to: '/product', },
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
                <v-label>รหัสสินค้า</v-label>
              </v-col>
              <v-col cols="12" sm="6" lg="2">
                <v-label>{{ product.product_id }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" lg="2">
                <v-label>ชื่อสินค้า</v-label>
              </v-col>
              <v-col cols="12" sm="6" lg="2">
                <v-label>{{ product.product_name }}</v-label>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" lg="2">
                <v-label>รายละเอียด</v-label>
              </v-col>
              <v-col cols="12" sm="6" lg="2">
                <v-label>{{ product.product_detail }}</v-label>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="3" lg="2">
            <v-row>
              <v-avatar size="280">
                <v-img
                  :src="`${product.product_img ? `${publicCtx.apiBaseUrl}${product.product_img}` : defaultUserImage}`"
                  cover alt="product">
                  <template v-slot:error>
                    <v-img :src="errorImage" cover alt="error"></v-img>
                  </template>
                </v-img>
              </v-avatar>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-text class="d-flex flex-wrap justify-center gap-2">
      <v-btn type="submit" color="muted" :to="'/product'">กลับ</v-btn>
    </v-card-text>
  </v-card>
</template>