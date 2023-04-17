# k8s-cronjob-end-time

- [Instalações](#instalação)
  - [Kubectl](#kubectl)
  - [Kind](#kind)
  - [Skaffold](#skaffold)
- [Instalações opcionais](#instalações-opcionais)
  - [Python](#python)
  - [Go](#go)
  - [AWS](#aws)
- [Execução](#execução)
- [Lidando com problemas]()
  - [Configuração AWS no kubectl]()

Normalmente usamos CronJob do Kubernetes apenas com período para começar.

Neste repositório demonstro como você também pode codificar para ele ter um período controlado de finalização/conclusão do _pod_.

## Instalação

### Kubectl

```sh
cd ~
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
```

Se precisar rode mais isso:

```sh
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
chmod +x kubectl
mkdir -p ~/.local/bin
mv ./kubectl ~/.local/bin/kubectl
kubectl version --client --output=yaml
```

### Kind

```sh
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.18.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

### Skaffold

```sh
curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && \
sudo install skaffold /usr/local/bin/
```

## Instalações opcionais

### Python

```sh
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo apt-get install -y apt-transport-https
```

```sh
sudo apt install python3.8
sudo apt install python3.8-venv
```

### Go

```sh
curl -LO "https://go.dev/dl/go1.20.2.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf ~/go1.20.2.linux-amd64.tar.gz
export PATH="$PATH:/usr/local/go/bin" # coloque no ~/.zshrc
```

### AWS

```sh
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

## Execução

```sh
skaffold dev # 1 terminal
watch kubectl get all -n=default
```

## Lidando com problemas

### Configuração AWS no kubectl

Pode ser que você rode comandos do `kubectl` com efeitos na nuvem por ter configurado ele para rodar na AWS.

Rode os comandos abaixo para resetar e fazer com que o `kubectl` rode localmente.

**Obs:** Altere `arn:aws:eks:us-east-1:000000000000:cluster/eks` para de acordo com seu.

```sh
kubectl config view
kubectl config delete-cluster arn:aws:eks:us-east-1:000000000000:cluster/eks
kubectl config delete-context arn:aws:eks:us-east-1:000000000000:cluster/eks
kubectl config unset users.arn:aws:eks:us-east-1:000000000000:cluster/eks
kubectl config set-context local --cluster=local
kubectl config use-context local
kubectl config view
kind delete cluster
kind create cluster
kubectl cluster-info --context kind-kind
kubectl get config
kubectl get pods --all-namespaces
```
