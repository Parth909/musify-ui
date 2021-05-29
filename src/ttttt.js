// Test file for some sample code
int arr[n][n];
for(int i=0, k=(n-1); i<n-1; i++, k--){
    // in js we need to mention the a
    for(int j=0; j<n-1; j++){
        if(j>=k){
            arr[i][j] = "#";
        }else{
            arr[i][j] = " ";
        }
    }
}

for(int i=0; i<n-1; i++){
    for(int j=0; j<n-1; j++){
        printf("%d",arr[i][j]);
    }
    printf("\n");
}