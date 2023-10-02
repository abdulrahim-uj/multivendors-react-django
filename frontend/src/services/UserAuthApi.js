import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserAuthApi = createApi({
  reducerPath: "UserAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),

  endpoints: (builder) => ({
    registraiton: builder.mutation({
      query: (user) => {
        return {
          url: "auth/registration/",
          method: "post",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    login: builder.mutation({
      query: (user) => {
        return {
          url: "auth/login/",
          method: "post",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getLoggedUser: builder.query({
      query: (access_token) => {
        return {
          url: "auth/profile/",
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),

    changeUserPassword: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: "auth/changepassword/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),

    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: "auth/send-reset-password-email/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `auth/reset-password/${id}/${token}/`,
          method: "POST",
          body: actualData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getHomeSlider: builder.query({
      query: () => {
        return {
          url: 'ecom/homeslider/',
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getHomeFour : builder.query({
      query: () => {
        return {
          url : 'ecom/homefour/',
          method: "GET",
          headers: {
            "Content-type": "application/json",
          }
        }
      }
    }),

    getCategory : builder.query({
      query: () => {
        return {
          url : 'ecom/category/',
          method: "GET",
          headers: {
            "Content-type": "application/json",
          }
        }
      }
    }),

    getProduct : builder.query({
      query: () => {
        return {
          url : 'ecom/product/',
          method: "GET",
          headers: {
            "Content-type": "application/json",
          }
        }
      }
    }),

    ProductByPrice : builder.mutation({
      query: ({price}) => {
        return {
          url : 'ecom/pricefilter/',
          method: "POST",
          body:price,
          headers: {
            "Content-type": "application/json",
          }
        }
      }
    }),

    CategoryFilter : builder.mutation({
      query: (category_url) => {
        return {
          url : 'ecom/categoryfilter/',
          method: "POST",
          body:category_url,
          headers: {
            "Content-type": "application/json",
          }
        }
      }
    }),

    getProductSlug : builder.mutation({
      query: (slug) => {
        return {
          url : 'ecom/productslug/',
          method: "POST",
          body:slug,
          headers: {
            "Content-type": "application/json",
          }
        }
      }
    }),

    getProductReview : builder.mutation({
      query: (actualDataReview) => {
        return {
          url : 'ecom/review/',
          method: "POST",
          body:actualDataReview,
          headers: {
            "Content-type": "application/json",
          }
        }
      }
    }),

    Cart: builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: "ecom/cart/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    getCart : builder.query({
      query: (access_token) => {
        return {
          url: "ecom/cart/",
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),

    Billing : builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: "ecom/billing/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),

    Order : builder.query({
      query: ({access_token}) => {
        return {
          url: "ecom/placeorder",
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),

    SearchFilter : builder.mutation({
      query: (search_url) => {
        return {
          url : 'ecom/search/',
          method: "POST",
          body:search_url,
          headers: {
            "Content-type": "application/json",
          }
        }
      }
    }),

    Payment : builder.mutation({
      query: ({ actualData, access_token }) => {
        return {
          url: "ecom/payment/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),

    




  }),
});

export const {
  useRegistraitonMutation,
  useLoginMutation,
  useGetLoggedUserQuery,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,
  useChangeUserPasswordMutation,
  useGetHomeSliderQuery,
  useGetHomeFourQuery,
  useGetCategoryQuery,
  useGetProductQuery,
  useProductByPriceMutation,
  useCategoryFilterMutation,
  useGetProductSlugMutation,
  useGetProductReviewMutation,
  useCartMutation,
  useGetCartQuery,
  useBillingMutation,
  useOrderQuery,
  useSearchFilterMutation,
  usePaymentMutation,
} = UserAuthApi;