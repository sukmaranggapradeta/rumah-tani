<template>
    <div class="container">
        <h3>Producer</h3>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined At</th>
                    <th class="actionTh">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Alvin</td>
                    <td>Alvin@mail.com</td>
                    <td>12 October 2019</td>
                    <td class="lastTd"> 
                        <i class="small material-icons delete">delete_forever</i> 
                        <i class="small material-icons edit">edit</i> 
                    </td>
                </tr>
                <tr>
                    <td>Alan</td>
                    <td>Alan@mail.com</td>
                    <td>10 October 2019</td>
                    <td class="lastTd"> 
                        <i class="small material-icons delete">delete_forever</i> 
                        <i class="small material-icons edit">edit</i> 
                    </td>
                </tr>
                <tr>
                    <td>Jonathan</td>
                    <td>Jonathan@mail.com</td>
                    <td>07 October 2019</td>
                    <td class="lastTd"> 
                        <i class="small material-icons delete">delete_forever</i> 
                        <i class="small material-icons edit">edit</i> 
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.material-icons {
    cursor: pointer;
}
.lastTd {
    display: flex;
    justify-content: space-around
}
.actionTh {
    text-align: center
}
.edit:hover {
    color: blue
}
.delete:hover {
    color: red
}
</style>