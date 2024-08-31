<template>
    <div>
    <div class="flex flex-wrap justify-center bg-slate-600">
        <div class=" basis-full md:basis-8/12  p-3">
            sda
            <div class="bg-slate-100 max-w-full rounded-lg  p-4 md:p-8 m-2 ">
            <div class="flex">
                <div class="basis-full md:basis-1/3 p-2">
                    <label class="form-control w-full m-1">
                        <div class="label">
                            <span class="label-text">Invoice Number:</span>
                   </div>
                        <input
                            type="text"
                            placeholder="00001"
                            class="input input-bordered input-sm w-full"
                        />
                    </label>
                </div>
                <div class="basis-full md:basis-1/3 p-2">
                    <label class="form-control w-full m-1">
                        <div class="label">
                            <span class="label-text">Date Issued:</span>
                        </div>
                        <input
                            type="text"
                            placeholder="00001"
                            class="input input-bordered input-sm w-full"
                        />
                    </label>
                </div>
                <div class="basis-full md:basis-1/3 p-2">
                    <label class="form-control w-full m-1">
                        <div class="label">
                            <span class="label-text">Due Date:</span>
                        </div>
                        <input
                            type="text"
                            placeholder="00001"
                            class="input input-bordered input-sm w-full"
                        />
                    </label>
                </div>

            </div>
            <div class="flex">
                <div class="basis-full md:basis-1/2 p-2">
                    <div class="bg-slate-200 rounded-lg p-4">
                        <h4 class="inline-block mr-2 text-xl">From</h4>
                        <select class="select select-bordered inline-block">
                            <option
                                disabled
                                selected
                            >Company / Person</option>
                            <option>Person</option>
                            <option>Company</option>
                        </select>
                        <div class="label">
                            <span class="label-text">Logo:</span>
                        </div>
                        <input
                            type="file"
                            class="file-input file-input-bordered w-full max-w-xs"
                        />
                        <label class="form-control w-full m-1">
                            <div class="label">
                                <span class="label-text">Company Name:</span>
                            </div>
                            <input
                                type="text"
                                placeholder=""
                                class="input input-bordered w-full"
                            />
                        </label>
                        <label class="form-control w-full m-1">
                            <div class="label">
                                <span class="label-text">Address:</span>
                            </div>
                            <input
                                type="text"
                                placeholder=""
                                class="input input-bordered w-full"
                            />
                        </label>
                        <label class="form-control w-full m-1">
                            <div class="label">
                                <span class="label-text">City, State, ZIP:</span>
                            </div>
                            <input
                                type="text"
                                placeholder=""
                                class="input input-bordered w-full"
                            />
                        </label>
                        <label class="form-control w-full m-1">
                            <div class="label">
                                <span class="label-text">Country:</span>
                            </div>
                            <input
                                type="text"
                                placeholder=""
                                class="input input-bordered w-full"
                            />
                        </label>

                    </div>
                </div>

                <div class="basis-full md:basis-1/2 p-2">
                    <div class="bg-slate-200 rounded-lg p-4">
                        <h4 class="inline-block mr-2 text-xl">Bill To</h4>
                        <select class="select select-bordered inline-block">
                            <option
                                disabled
                                selected
                            >Company / Person</option>
                            <option>Person</option>
                            <option>Company</option>
                        </select>
                        <label class="form-control w-full m-1">
                            <div class="label">
                                <span class="label-text">Company Name:</span>
                            </div>
                            <input
                                type="text"
                                placeholder=""
                                class="input input-bordered w-full"
                            />
                        </label>
                        <label class="form-control w-full m-1">
                            <div class="label">
                                <span class="label-text">Address:</span>
                            </div>
                            <input
                                type="text"
                                placeholder=""
                                class="input input-bordered w-full"
                            />
                        </label>
                        <label class="form-control w-full m-1">
                            <div class="label">
                                <span class="label-text">City, State, ZIP:</span>
                            </div>
                            <input
                                type="text"
                                placeholder=""
                                class="input input-bordered w-full"
                            />
                        </label>
                        <label class="form-control w-full m-1">
                            <div class="label">
                                <span class="label-text">Country:</span>
                            </div>
                            <input
                                type="text"
                                placeholder=""
                                class="input input-bordered w-full"
                            />
                        </label>

                    </div>
                </div>

            </div>

            <div class="overflow-x-auto bg-slate-200 rounded-lg m-2 p-4 md:p-8">
                <table class="table table-zebra">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th></th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Tax 😒</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr>
                            <th>1</th>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Web Design"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="2"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="0.420"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="12%"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="0.840"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                        </tr>
                        <!-- row 2 -->
                        <tr>
                            <th>2</th>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Web Design"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="2"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="0.420"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="12%"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="0.840"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                        </tr>
                        <!-- row 3 -->
                        <tr>
                            <th>3</th>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Web Design"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="2"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="0.420"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="12%"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="0.840"
                                    class="input input-bordered input-sm w-full max-w-xs"
                                />
                            </td>
                            <td>
                                <button class="text-red-500"> remove </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-outline btn-primary  px-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    Add More
                </button>
            </div>

        </div>
        </div>

    </div>
</div>
</template>

<script
    setup
    lang="ts"
>

</script>

<style scoped></style>