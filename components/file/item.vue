<script lang="ts" setup>
import defaultImage from "@/assets/images/default.jpg"

const { public: publicCtx } = useRuntimeConfig()

const { item } = defineProps(['item'])
</script>

<template>
  <v-img v-if="item.file_type.startsWith('image/')" class="w-100" :src="`${publicCtx.apiBaseUrl}${item.file_path}`" cover
    alt="homework">
    <template v-slot:error>
      <v-img cover class="w-100" :src="defaultImage"></v-img>
    </template>
  </v-img>
  <video v-else-if="item.file_type.startsWith('video/')" class="w-100" controls>
    <source :src="`${publicCtx.apiBaseUrl}${item.file_path}`" :type="item.file_type" />
    <track label="English" kind="subtitles" srclang="en" src="captions/vtt/sintel-en.vtt" default />
    Your browser does not support the video element.
  </video>
  <audio v-else-if="item.file_type.startsWith('audio/')" controls>
    <source :src="`${publicCtx.apiBaseUrl}${item.file_path}`" :type="item.file_type" />
    Your browser does not support the audio element.
  </audio>
  <a v-else :href="`${publicCtx.apiBaseUrl}/download?f=${item.file_path}&n=${item.file_name}`">
    <div class="d-flex flex-column justify-center align-center h-100 pb-10">
      <v-avatar color="secondary" size="80">
        <v-icon size="40">mdi-file-outline</v-icon>
      </v-avatar>
      <v-label>{{ item.file_name }}</v-label>
    </div>
  </a>
</template>