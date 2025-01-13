<script setup lang="ts">
import { CommentApi } from '@/services/api'
import getToken from '@/utils/getToken';
import { onMounted, ref, watch, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { PostCommentType, GetCommentType } from '@/types/database.type'
import { useToast } from 'vue-toastification';

const props = defineProps<{
    productId: string
}>()

const toast = useToast()

const router = useRouter()
const page: Ref<number> = ref(1)
const content: Ref<string> = ref('')
const refetch: Ref<boolean> = ref(false)
const comments: Ref<GetCommentType[]> = ref([])
const readAll: Ref<boolean> = ref(false)
const totalComments: Ref<number> = ref(0)
const load_more_flag: Ref<boolean> = ref(false)

const getComments = async () => {
    let response = await CommentApi.list(props.productId, page.value)

    if (response) {
        if(comments.value.length === 0){
            comments.value = response.comments
        }else{
            comments.value.push(...response.comments)
        }
        totalComments.value = response.total

        if (comments.value.length < totalComments.value) {
            load_more_flag.value = true
        }else{
            load_more_flag.value = false
        }
    }
}

const handleAddComment = async () => {
    let token = getToken()

    if (!token) {
        router.push({
            path: '/login'
        })
        return
    }

    let obj: PostCommentType = {
        productId: props.productId,
        content: content.value
    }

    let result = await CommentApi.create(obj)

    if (!result) {
        toast.error("Comment created is failed")
        return
    }

    toast.success("Comment created is successfully")
    refetch.value = !refetch.value
    content.value = ''

}

const handleLoadMore = () => {
    page.value = page.value + 1
}

watch(() => refetch.value, () => getComments())
watch(() => page.value, () => getComments())
onMounted(() => getComments())

</script>

<template>
    <div class="flex flex-wrap justify-between items-start relative" id="comment-container">
        <div :class="{ 'w-full items-end': !readAll, 'md:w-[49%] w-full mb-6 md:sticky md:top-[84px]': readAll }"
            class="flex flex-wrap md:gap-5">
            <div :class="{ 'md:!w-9/12': readAll }" class="w-9/12 pr-2 md:w-6/12 lg:w-4/12">
                <input v-model="content" type="text" placeholder="Write a Comment..."
                    class="border-[#000] text-sm bg-[#f2f2f2] w-full block rounded py-[10px] px-3">
            </div>
            <div :class="{ 'md:!w-2/12': readAll }" class="w-3/12 md:w-2/12 lg:w-1/12">
                <button @click="handleAddComment"
                    class="bg-black text-white py-[10px] text-sm font-medium block w-full rounded">Add</button>
            </div>
            <div v-if="readAll" class="pt-5">
                <button @click="() => readAll = false" class="text-[#757575] text-sm underline hover:text-black">
                    Show Featured Reviews
                </button>
            </div>
        </div>

        <template v-if="comments.length && comments.length > 0 && !readAll">
            <div class="pt-10 w-full flex flex-wrap justify-between">
                <div class="md:w-[49%] w-full mb-4 md:mb-0">
                    <p class="text-[#555] italic font-serif text-[20px] mb-1">
                        "{{ comments[0].content }}"
                    </p>
                    <span class="text-[#757575] text-sm">
                        {{ comments[0].userId.firstName + ' ' + comments[0].userId.lastName }}
                    </span>
                </div>
                <div class="md:w-[49%] w-full mb-4 md:mb-0" v-if="comments[1]">
                    <p class="text-[#555] italic font-serif text-[20px] mb-1">
                        "{{ comments[1].content }}"
                    </p>
                    <span class="text-[#757575] text-sm">
                        {{ comments[1].userId.firstName + ' ' + comments[1].userId.lastName }}
                    </span>
                </div>
            </div>
        </template>

        <template v-if="comments.length && comments.length > 0 && readAll">
            <div class="w-full md:w-[49%]">
                <div v-for="comment in comments" :key="comment._id" class="mb-6">
                    <p class="italic font-serif text-[#555]">"{{ comment.content }}"</p>
                    <span class="text-[#757575] text-sm">{{ comment.userId.firstName + ' ' + comment.userId.lastName
                        }}</span>
                </div>
                <div v-if="load_more_flag">
                    <button @click="handleLoadMore" class="text-sm text-[#757575] underline hover:text-black">Load More Reviews</button>
                </div>
            </div>
        </template>

        <template v-if="comments.length && comments.length > 0 && !readAll">
            <button @click="() => readAll = true" class="underline hover:text-black text-[14px] text-[#757575] pt-5">
                Read All Reviews
            </button>
        </template>
    </div>
</template>

<style scoped>
#comment-container {
    padding: 24px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: linear-gradient(90deg, rgba(245, 245, 247, 0.3) 0%, #F5F5F7 100%);

}
</style>