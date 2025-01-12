<script setup lang="ts">
import { getUser } from '@/stores/user.store';
import OrderList from '@/components/public/order/OrderList.vue'
import type { getOrderList, getOrders } from '@/types/database.type';
import { storeToRefs } from 'pinia';
import { onMounted, ref, type Ref } from 'vue';

const props = defineProps<{
    item: getOrders
}>()


const getDate: Ref<string> = ref('')
const getSummary: Ref<number> = ref(0)
const username : Ref<string> = ref('')

const userStore = getUser()

const { user } = storeToRefs(userStore)

const changeData = () => {
    const isoDate = props.item.createdAt;

    const date = new Date(isoDate);

    const readableDate = date.toLocaleString("en-EN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    getDate.value = readableDate

    let kod = 0
    props.item.list.forEach((item: getOrderList) => {
        kod += item.count
    })

    getSummary.value = kod

    if(user.value && 'firstName' in user.value && 'lastName' in user.value){
        username.value = user.value.firstName + ' ' + user.value.lastName
    }

}

onMounted(() => { changeData() })
</script>

<template>
    <div class="border mb-6 border-[#e2e2e2] rounded">
        <div class="bg-[#FAFAFA] p-3">
            <div class="flex flex-wrap items-center">
                <div class="w-6/12 sm:w-4/12 md:w-3/12 flex flex-col">
                    <p class="text-[14px] text-[#757575]">Order Date</p>
                    <span class="text-[12px] text-[#555]">{{ getDate }}</span>
                </div>

                <div class="w-3/12 hidden md:flex flex-col">
                    <p class="text-[14px] text-[#757575]">Order Summary</p>
                    <span class="text-[12px] text-[#555]">{{ getSummary }}</span>
                </div>

                <div class="hidden sm:w-4/12 md:w-3/12 sm:flex flex-col">
                    <p class="text-[14px] text-[#757575]">Buyer</p>
                    <span class="text-[12px] text-[#555]"> {{ username }}</span>
                </div>

                <div class="w-6/12 sm:w-4/12 md:w-3/12 flex flex-col">
                    <p class="text-[14px] text-[#757575]">Amount</p>
                    <span class="text-[12px] text-[#555]"> $ {{ props.item.totalPrice - props.item.totalDiscount }}</span>
                </div>
            </div>
        </div>
        <div class="p-3">
            <template v-if="item.list && item.list.length > 0">
                <OrderList v-for="list in item.list" :key="list._id" :list="list" />
            </template>
        </div>
    </div>
</template>