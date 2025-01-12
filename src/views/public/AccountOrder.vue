<script setup lang="ts">
import { Order } from '@/services/api';
import { onMounted, ref, type Ref } from 'vue';
import type { getOrders } from '@/types/database.type'
import OrderGroup from '@/components/public/order/OrderGroup.vue'

const orders: Ref<getOrders[]> = ref([])

const getData = async () => {
    let response = await Order.list()

    if (!response) {
        return
    }

    orders.value = response
}

onMounted(() => getData())

</script>

<template>
    <div>
        <div class="mb-4">
            <h2 class="text-[20px] font-medium">Orders</h2>
        </div>
        <template v-if="orders.length && orders.length > 0">
            <div>
                <OrderGroup v-for="order in orders" :key="order._id" :item="order" />
            </div>
        </template>
    </div>
</template>