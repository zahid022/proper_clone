<script setup lang="ts">
import { cartStore } from '@/stores/public/Cart.store';
import { storeToRefs } from 'pinia';
import SecureIcon from '@/static/icon/SecureIcon.vue'
import CartItem from '@/components/public/cart/CartItem.vue'

const basketStore = cartStore()

const { basket } = storeToRefs(basketStore)

function getDeliveryDateRange(startOffset: number, endOffset: number) {
    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() + startOffset);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + endOffset);

    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    const formattedStartDate = startDate.toLocaleDateString("en-US", options);
    const formattedEndDate = endDate.toLocaleDateString("en-US", options);

    return `Delivery by ${formattedStartDate} – ${formattedEndDate}`;
}

const deliveryMessage = getDeliveryDateRange(10, 13);

</script>

<template>
    <main class="min-h-[81vh] bg-[#EDEDEE]">
        <template v-if="basket.list.length > 0">
            <section class="md:px-8 lg:px-12 py-10">
                <div class="flex flex-wrap relative">
                    <div class="flex w-full mb-4 px-3 md:px-0 justify-between items-center">
                        <h2 class="text-[22px] lg:text-[28px]">Shopping Bag</h2>
                        <span class="hidden md:block">
                            <SecureIcon />
                        </span>
                    </div>
                    <div class="relative flex flex-wrap">
                        <div class="w-full p-3 md:w-8/12 md:p-5 md:rounded bg-white">
                            <div
                                class="bg-[#f1f1f3] mb-2 p-2 border border-[#00000008] flex items-center justify-between">
                                <p class="text-[#757575] text-[12px] font-medium uppercase">Custom Orders</p>
                                <p class="text-[#6d6d6d] text-[11px]">{{ deliveryMessage }}</p>
                            </div>
                            <div>
                                <CartItem v-for="item in basket.list" :key="item._id" :item="item" />
                            </div>
                        </div>
                        <div class="w-full md:w-4/12 pl-2">
                            <div class="md:hidden">
                                <p class="text-center text-[20px] py-8">Order Summary</p>
                            </div>
                            <div class="bg-white p-3 md:sticky md:top-[68px] rounded">

                                <div class="border-b pb-3">
                                    <ul v-if="basket.totalPrice">
                                        <li class="flex justify-between mb-2 items-center">
                                            <span class="text-[14px] text-[#757575]">Price</span>
                                            <span class="text-[14px] text-[#757575]">${{ basket.totalPrice}}</span>
                                        </li>
                                        <li class="flex justify-between mb-2 items-center">
                                            <span class="text-[14px] text-[#757575]">Discount</span>
                                            <span class="text-[14px] text-[#757575]">${{ basket.totalDiscount}}</span>
                                        </li>
                                        <li class="flex justify-between mb-2 items-center">
                                            <span class="text-[14px] text-[#757575]">Shipping</span>
                                            <span class="text-[14px] text-[#757575]">$18</span>
                                        </li>
                                        <li class="flex justify-between items-center">
                                            <span class="text-[16px] font-medium text-[#757575]">Total</span>
                                            <span class="text-[16px] font-medium text-[#757575]">${{ (basket.totalPrice
                                                - basket.totalDiscount) + 18 }}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="pt-4">
                                    <button
                                        class="py-[1rem] block w-full font-medium uppercase px-[2.5rem] bg-black text-white rounded">
                                        Secure Checkout →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>

        <template v-else>
            <div class="min-h-[81vh] flex items-center justify-center">
                test
            </div>
        </template>
    </main>
</template>
