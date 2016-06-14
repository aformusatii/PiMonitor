/* strstr example */
#include <stdio.h>
#include <string.h>

#define MAXBUFLEN 10000

int replaceNewLine(char s[]) {
    int j = 0;
    while (s[j] != '\0'){
        if (s[j] == '\n' || s[j] == '\'') {
            s[j] = ' ';
        }
        j++;
    }
    return 0;
}

int getStat(char * procsToFind) {
  FILE *fp;
  char path[MAXBUFLEN];
  char *procs[50];
  int j = 0;
  int i = 0;
  
  // Split processes to be found
  char *pch;
  pch = strtok (strdup(procsToFind),",");
  while (pch != NULL)
  {
    procs[j++] = pch;
    pch = strtok (NULL, ",");
  }
  
  /* Open the command for reading. */
  fp = popen("ps aux", "r");
  if (fp == NULL) {
    printf("Failed to run command\n" );
    return 0;
  }

  printf("pushTaskStat([\n" );

  /* Read the output a line at a time */
  while (fgets(path, sizeof(path)-1, fp) != NULL) {
    for (i = 0; i < j; i++) {
      if (strstr(path, procs[i])) {
        replaceNewLine(path);
        printf("{'procName':'%s','procPath':'%s'},\n", procs[i], path);
      }     
    }
  }
  
  printf("]);" );

  /* close */
  pclose(fp);

  return 0;
}

int main (int argc, char *argv[])
{
  int i;
  
	printf("Cache-Control: no-cache, no-store, must-revalidate\n");
	printf("Pragma: no-cache\n");
	printf("Expires: 0\n");
  printf("Content-Type: text/javascript\n\n");
  
  char *queryString = getenv("QUERY_STRING");
  if (queryString != NULL) {
    char *queryParam;
    queryParam = strtok (strdup(queryString),"=");
    if (queryParam != NULL) {
      queryParam = strtok (NULL, "=");
      if (queryParam != NULL) {
        queryParam = strtok (strdup(queryParam), "&");
        if (queryParam != NULL) {
          getStat(queryParam);
        }
      }
    }
  }
  
  fflush(stdout);
}