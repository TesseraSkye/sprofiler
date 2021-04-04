<template>
    <Page>
        <ActionBar>
  <StackLayout orientation="horizontal">
    <!-- <image src="res://icon" width="40" height="40" verticalAlignment="center" /> -->
    <label text="'Sprofiler" fontSize="24" verticalAlignment="center" />
  </StackLayout>
</ActionBar>


        <GridLayout>
            <Label class="info">
                <FormattedString>
                    <Span class="fas" text.decode="&#xf135; "/>
                    <Span :text="message"/>
                </FormattedString>
            </Label>
        </GridLayout>
    </Page>
</template>

<script>
  export default {
    computed: {
      message() {
        return "Blank {N}-Vue app";
      }
    }
  };
</script>

<style scoped lang="scss">
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
