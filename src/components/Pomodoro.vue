<template>
    <div class="popup">
        <div class="popup-inner">
            <slot />
            <button class="popup-close">Close</button>
        </div>
    </div>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
.popup{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0,0,0,0.5);

    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration-color: rgb(12, 14, 13);
}

.popup-inner{
    background: rgb(68, 236, 217);
    padding: 32px;
    font-style: italic;
    color: black;
}

</style>